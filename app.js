// --- セットアップ ---
const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// --- ミドルウェア ---
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// --- APIエンドポイント (データベースと連携) ---

// ドリンクとそのバリエーション情報を全て取得するAPI
app.get("/api/drinks", async (req, res) => {
  try {
    const drinksWithVariants = await prisma.drink.findMany({
      include: {
        variants: {
          include: {
            size: true, // 各バリアントにサイズの詳細情報(name, volume)を含める
          },
        },
      },
    });
    res.json(drinksWithVariants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "データベースからドリンクを取得できませんでした。" });
  }
});

// カスタムのリストを提供するAPI
app.get("/api/customizations", async (req, res) => {
  try {
    const customizations = await prisma.customization.findMany();
    res.json(customizations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "データベースからカスタムを取得できませんでした。" });
  }
});

// 合計金額とカロリーを計算するAPI
app.post("/api/calculate", async (req, res) => {
  try {
    const { drinkId, sizeId, customIds } = req.body;

    // データベースから情報を取得
    const variant = await prisma.drinkVariant.findUnique({
      where: { drinkId_sizeId: { drinkId, sizeId } },
      include: { drink: true, size: true },
    });

    const customizations = await prisma.customization.findMany({
      where: { id: { in: customIds } },
    });

    if (!variant || customizations.length !== customIds.length) {
      return res.status(400).json({ error: "無効な選択です。" });
    }

    // 合計を計算
    let totalPrice = variant.price;
    let totalCalories = variant.calories;
    let allAllergens = new Set(variant.allergens); // Setを使って重複をなくす
    let spell = [variant.size.name, variant.drink.name]; // 呪文の組み立て開始

    customizations.forEach((custom) => {
      totalPrice += custom.price;
      totalCalories += custom.calories;
      custom.allergens.forEach((allergen) => allAllergens.add(allergen));
      spell.push(custom.name);
    });

    const finalSpell = spell.join("・");

    // 結果を返す
    res.json({
      spell: finalSpell,
      spellLength: finalSpell.length,
      totalPrice,
      totalCalories,
      allergens: Array.from(allAllergens).filter((a) => a !== "-"), // "-"を除外
    });
  } catch (error) {
    console.error(error); // サーバー側でエラー内容を確認できるようにログを出力
    res.status(500).json({ error: "計算中にエラーが発生しました。" });
  }
});

// --- サーバーを起動 ---
app.listen(PORT, () => {
  console.log(
    `サーバーがポート${PORT}で起動しました。 http://localhost:${PORT}`
  );
});
