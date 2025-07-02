// --- HTML要素の取得 ---
const drinkSelect = document.getElementById("base-drink");
const slots = document.querySelectorAll(".slot");
const spinButton = document.getElementById("spin-button");
const resultText = document.getElementById("result-text");

// --- グローバル変数 ---
let drinksData = [];
let customizationsData = [];

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", async () => {
  // データが読み込まれるまでボタンを無効化
  spinButton.disabled = true;
  resultText.textContent = "データを読み込み中...";

  try {
    // サーバーのAPIからデータを並行して取得
    const [drinksRes, customsRes] = await Promise.all([
      fetch("/api/drinks"),
      fetch("/api/customizations"),
    ]);

    // サーバーの応答が正常かチェック
    if (!drinksRes.ok || !customsRes.ok) {
      throw new Error(
        `サーバーエラー: ${drinksRes.status}, ${customsRes.status}`
      );
    }

    drinksData = await drinksRes.json();
    customizationsData = await customsRes.json();

    // ドリンクデータがあればUIを構築
    if (drinksData.length > 0) {
      drinksData.forEach((drink) => {
        const option = document.createElement("option");
        option.value = drink.name;
        option.textContent = `${drink.name} (¥${drink.price})`;
        drinkSelect.appendChild(option);
      });
      resultText.textContent = "準備完了！スロットを開始してください。";
      spinButton.disabled = false; // データ読み込み後にボタンを有効化
    } else {
      resultText.textContent = "エラー: ドリンクデータが空です。";
    }
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
    resultText.textContent =
      "エラー: データの取得に失敗しました。サーバーが起動しているか確認してください。";
  }
});

// --- イベントリスナーの設定 ---
spinButton.addEventListener("click", () => {
  // カスタムデータがない場合は処理を中断
  if (customizationsData.length === 0) {
    resultText.textContent =
      "カスタムデータがありません。ページを再読み込みしてください。";
    return;
  }

  // スピニング開始
  slots.forEach((slot) => {
    slot.classList.add("spinning");
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * customizationsData.length);
      slot.textContent = customizationsData[randomIndex].name;
    }, 100);
    slot.intervalId = intervalId;
  });

  resultText.innerHTML = "スロット回転中...";
  spinButton.disabled = true;

  // 2秒後にスピニングを停止
  setTimeout(() => {
    const finalCustomNames = [];
    slots.forEach((slot) => {
      clearInterval(slot.intervalId);
      slot.classList.remove("spinning");
      const randomIndex = Math.floor(Math.random() * customizationsData.length);
      const finalCustom = customizationsData[randomIndex];
      slot.textContent = finalCustom.name;
      finalCustomNames.push(finalCustom.name);
    });

    const selectedDrinkName = drinkSelect.value;

    // サーバーに計算を依頼
    fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        drinkName: selectedDrinkName,
        customNames: finalCustomNames,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        resultText.innerHTML = `
        「${selectedDrinkName}」<br>
        カスタム： 「${finalCustomNames.join("」「")}」<br><br>
        <strong>合計金額: ¥${data.totalPrice}</strong><br>
        <strong>合計カロリー: 約${data.totalCalories}kcal</strong>
      `;
      })
      .catch((error) => {
        console.error("計算エラー:", error);
        resultText.textContent = "エラー: 計算に失敗しました。";
      });

    spinButton.disabled = false;
  }, 2000);
});
