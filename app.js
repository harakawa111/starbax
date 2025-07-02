// --- セットアップ ---
const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client"); // PrismaClientをインポート
const app = express();
const prisma = new PrismaClient(); // PrismaClientをインスタンス化
const PORT = process.env.PORT || 3000;

// --- ミドルウェア ---
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// --- モックデータは完全に削除 ---

// --- APIエンドポイント (データベースと連携) ---

// ドリンクのリストを提供するAPI
app.get("/api/drinks", async (req, res) => {
  try {
    const drinks = await prisma.drink.findMany(); // DBから全ドリンク取得
    res.json(drinks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "データベースからドリンクを取得できませんでした。" });
  }
});

// カスタムのリストを提供するAPI
app.get("/api/customizations", async (req, res) => {
  try {
    const customizations = await prisma.customization.findMany(); // DBから全カスタム取得
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
    const { drinkName, customNames } = req.body;

    // DBから選択されたドリンクとカスタムの情報を取得
    const selectedDrinkObject = await prisma.drink.findUnique({
      where: { name: drinkName },
    });
    const selectedCustomObjects = await prisma.customization.findMany({
      where: { name: { in: customNames } },
    });

    if (
      !selectedDrinkObject ||
      selectedCustomObjects.length !== customNames.length
    ) {
      return res.status(400).json({ error: "無効な選択です。" });
    }

    // 合計を計算
    let totalPrice = selectedDrinkObject.price;
    let totalCalories = selectedDrinkObject.calories;
    selectedCustomObjects.forEach((custom) => {
      totalPrice += custom.price;
      totalCalories += custom.calories;
    });

    // 結果を返す
    res.json({
      totalPrice: totalPrice,
      totalCalories: totalCalories,
    });
  } catch (error) {
    res.status(500).json({ error: "計算中にエラーが発生しました。" });
  }
});

// --- サーバーを起動 ---
app.listen(PORT, () => {
  console.log(
    `サーバーがポート${PORT}で起動しました。 http://localhost:${PORT}`
  );
});
