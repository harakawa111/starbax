// --- データの準備（モックデータ） ---
const drinks = [
  "ドリップ コーヒー",
  "スターバックス ラテ",
  "キャラメル マキアート",
  "抹茶 ティー ラテ",
];

const customizations = [
  "無脂肪乳に変更",
  "低脂肪タイプに変更",
  "豆乳に変更",
  "アーモンドミルクに変更",
  "オーツミルクに変更",
  "ホイップ追加",
  "チョコチップ追加",
  "キャラメルソース追加",
  "チョコレートソース追加",
  "はちみつ追加",
  "シロップ抜き",
  "エスプレッソショット追加",
  "コーヒー増量",
  "氷少なめ",
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
  option.value = drink;
  option.textContent = drink;
  drinkSelect.appendChild(option);
});

// --- イベントリスナーの設定 ---
spinButton.addEventListener("click", () => {
  // スピニング開始
  slots.forEach((slot) => {
    slot.classList.add("spinning");
    // アニメーション中はテキストを更新し続ける
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * customizations.length);
      slot.textContent = customizations[randomIndex];
    }, 100);
    // スロットごとに参照を保存
    slot.intervalId = intervalId;
  });

  // 結果表示をリセット
  resultText.textContent = "スロット回転中...";
  spinButton.disabled = true; // ボタンを無効化

  // 2秒後にスピニングを停止
  setTimeout(() => {
    let finalCustoms = [];
    slots.forEach((slot) => {
      // アニメーションとテキスト更新を停止
      clearInterval(slot.intervalId);
      slot.classList.remove("spinning");

      // 最終的なカスタムを決定
      const randomIndex = Math.floor(Math.random() * customizations.length);
      const finalCustom = customizations[randomIndex];
      slot.textContent = finalCustom;
      finalCustoms.push(finalCustom);
    });

    // 最終結果を表示
    const selectedDrink = drinkSelect.value;
    resultText.textContent = `「${selectedDrink}」に「${finalCustoms.join(
      "」「"
    )}」のカスタム！`;
    spinButton.disabled = false; // ボタンを再度有効化
  }, 2000); // 2000ミリ秒 = 2秒
});
