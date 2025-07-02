// --- セットアップ ---
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// --- ミドルウェア ---
// 'public'ディレクトリの静的ファイル（HTML, CSS, JS）を配信する設定
app.use(express.static(path.join(__dirname, "public")));
// POSTリクエストで送られてくるJSONデータを解析するための設定
app.use(express.json());

// --- サーバー側のモックデータ ---
const drinks = [
  { name: "ドリップ コーヒー (Hot)", price: 380, calories: 10 },
  { name: "スターバックス ラテ (Hot)", price: 445, calories: 193 },
  { name: "キャラメル マキアート", price: 500, calories: 245 },
  { name: "抹茶 ティー ラテ", price: 495, calories: 226 },
];

const customizations = [
  { name: "無脂肪乳に変更", price: 0, calories: -80 },
  { name: "低脂肪タイプに変更", price: 0, calories: -40 },
  { name: "豆乳に変更", price: 55, calories: -15 },
  { name: "アーモンドミルクに変更", price: 55, calories: -20 },
  { name: "オーツミルクに変更", price: 55, calories: -5 },
  { name: "ホイップ追加", price: 55, calories: 83 },
  { name: "チョコチップ追加", price: 55, calories: 27 },
  { name: "キャラメルソース追加", price: 0, calories: 17 },
  { name: "チョコレートソース追加", price: 0, calories: 16 },
  { name: "はちみつ追加", price: 0, calories: 21 },
  { name: "エスプレッソショット追加", price: 55, calories: 5 },
];

// --- APIエンドポイント（APIの窓口） ---

// ドリンクのリストを提供するAPI
app.get("/api/drinks", (req, res) => {
  res.json(drinks);
});

// カスタムのリストを提供するAPI
app.get("/api/customizations", (req, res) => {
  res.json(customizations);
});

// 合計金額とカロリーを計算するAPI
app.post("/api/calculate", (req, res) => {
  const { drinkName, customNames } = req.body;

  const selectedDrinkObject = drinks.find((d) => d.name === drinkName);
  const selectedCustomObjects = customNames.map((name) =>
    customizations.find((c) => c.name === name)
  );

  if (!selectedDrinkObject || selectedCustomObjects.includes(undefined)) {
    return res.status(400).json({ error: "無効な選択です。" });
  }

  let totalPrice = selectedDrinkObject.price;
  let totalCalories = selectedDrinkObject.calories;
  selectedCustomObjects.forEach((custom) => {
    totalPrice += custom.price;
    totalCalories += custom.calories;
  });

  res.json({
    totalPrice: totalPrice,
    totalCalories: totalCalories,
  });
});

// --- サーバーを起動 ---
app.listen(PORT, () => {
  console.log(
    `サーバーがポート${PORT}で起動しました。 http://localhost:${PORT}`
  );
});
