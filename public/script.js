// --- データの準備（オブジェクトの配列にアップグレード） ---
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

// --- HTML要素の取得 ---
const drinkSelect = document.getElementById("base-drink");
const slots = document.querySelectorAll(".slot");
const spinButton = document.getElementById("spin-button");
const resultText = document.getElementById("result-text");

// --- 初期化処理 ---
// ドリンク選択のプルダウンに選択肢を追加する
drinks.forEach((drink) => {
  const option = document.createElement("option");
  option.value = drink.name; // valueもnameに設定
  option.textContent = `${drink.name} (¥${drink.price})`; // 値段も表示
  drinkSelect.appendChild(option);
});

// --- イベントリスナーの設定 ---
spinButton.addEventListener("click", () => {
  // スピニング開始
  slots.forEach((slot) => {
    slot.classList.add("spinning");
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * customizations.length);
      slot.textContent = customizations[randomIndex].name; // .nameプロパティを表示
    }, 100);
    slot.intervalId = intervalId;
  });

  resultText.innerHTML = "スロット回転中..."; // innerHTMLに変更
  spinButton.disabled = true;

  // 2秒後にスピニングを停止
  setTimeout(() => {
    let finalCustomNames = [];
    slots.forEach((slot) => {
      clearInterval(slot.intervalId);
      slot.classList.remove("spinning");

      const randomIndex = Math.floor(Math.random() * customizations.length);
      const finalCustom = customizations[randomIndex];
      slot.textContent = finalCustom.name; // .nameプロパティを表示
      finalCustomNames.push(finalCustom.name);
    });

    // --- ここから計算ロジック ---
    // 1. ベースドリンクの情報を取得
    const selectedDrinkObject = drinks.find(
      (drink) => drink.name === drinkSelect.value
    );

    // 2. 選ばれたカスタムの情報を取得
    const selectedCustomObjects = finalCustomNames.map((name) => {
      return customizations.find((custom) => custom.name === name);
    });

    // 3. 合計金額とカロリーを計算
    let totalPrice = selectedDrinkObject.price;
    let totalCalories = selectedDrinkObject.calories;

    selectedCustomObjects.forEach((custom) => {
      totalPrice += custom.price;
      totalCalories += custom.calories;
    });

    // 最終結果を表示
    resultText.innerHTML = `
      「${selectedDrinkObject.name}」<br>
      カスタム： 「${finalCustomNames.join("」「")}」<br><br>
      <strong>合計金額: ¥${totalPrice}</strong><br>
      <strong>合計カロリー: 約${totalCalories}kcal</strong>
    `;
    spinButton.disabled = false;
  }, 2000);
});
