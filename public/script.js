// --- HTML要素の取得 ---
const drinkSelect = document.getElementById("base-drink");
const sizeSelect = document.createElement("select"); // サイズ選択は動的に作成
const slotsContainer = document.getElementById("slots-container");
const spinButton = document.getElementById("spin-button");
const resultText = document.getElementById("result-text");

// --- グローバル変数 ---
let drinksData = [];
let customizationsData = [];

// --- 関数 ---
function updateSizeOptions() {
  const selectedDrinkId = parseInt(drinkSelect.value);
  const selectedDrink = drinksData.find((d) => d.id === selectedDrinkId);

  sizeSelect.innerHTML = ""; // 前の選択肢をクリア

  if (selectedDrink && selectedDrink.variants) {
    selectedDrink.variants.forEach((variant) => {
      const option = document.createElement("option");
      option.value = variant.size.id;
      option.textContent = `${variant.size.name} (${variant.size.volume}ml)`;
      sizeSelect.appendChild(option);
    });
  }
}

// --- 初期化処理 ---
document.addEventListener("DOMContentLoaded", async () => {
  spinButton.disabled = true;
  resultText.textContent = "データを読み込み中...";

  const controlsDiv = document.querySelector(".controls");
  const sizeLabel = document.createElement("label");
  sizeLabel.textContent = "サイズ:";
  sizeLabel.htmlFor = "size-select";
  sizeSelect.id = "size-select";
  controlsDiv.appendChild(document.createElement("br"));
  controlsDiv.appendChild(sizeLabel);
  controlsDiv.appendChild(sizeSelect);

  try {
    const [drinksRes, customsRes] = await Promise.all([
      fetch("/api/drinks"),
      fetch("/api/customizations"),
    ]);

    if (!drinksRes.ok || !customsRes.ok)
      throw new Error("サーバーの応答がありません");

    drinksData = await drinksRes.json();
    customizationsData = await customsRes.json();

    if (drinksData.length > 0) {
      drinksData.forEach((drink) => {
        const option = document.createElement("option");
        option.value = drink.id;
        option.textContent = drink.name;
        drinkSelect.appendChild(option);
      });
      updateSizeOptions();
      resultText.textContent = "準備完了！スロットを開始してください。";
      spinButton.disabled = false;
    } else {
      resultText.textContent = "エラー: ドリンクデータがありません。";
    }
  } catch (error) {
    console.error("データの取得に失敗:", error);
    resultText.textContent = "エラー: データの取得に失敗しました。";
  }
});

// --- イベントリスナー ---
drinkSelect.addEventListener("change", updateSizeOptions);

spinButton.addEventListener("click", async () => {
  const selectedDrink = drinksData.find(
    (d) => d.id === parseInt(drinkSelect.value)
  );
  if (!selectedDrink || customizationsData.length === 0) return;

  // 【修正点1】利用可能なカスタムを先に絞り込む
  const availableCustoms = customizationsData.filter(
    (c) =>
      c.availableFor.includes("all") ||
      c.availableFor.includes(selectedDrink.drinkType)
  );

  // 【修正点2】スロット数を、ランダム(1-3)かつ利用可能なカスタム数を超えないように決定
  const maxSlots = Math.min(3, availableCustoms.length);
  const slotCount = Math.floor(Math.random() * maxSlots) + 1;

  slotsContainer.innerHTML = "";
  for (let i = 0; i < slotCount; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.textContent = `カスタム${i + 1}`;
    slotsContainer.appendChild(slot);
  }
  const slots = document.querySelectorAll(".slot");

  // スピニング開始
  slots.forEach((slot) => {
    slot.classList.add("spinning");
    const intervalId = setInterval(() => {
      const randomCustom =
        availableCustoms[Math.floor(Math.random() * availableCustoms.length)];
      slot.textContent = randomCustom.name;
    }, 100);
    slot.intervalId = intervalId;
  });

  resultText.innerHTML = "スロット回転中...";
  spinButton.disabled = true;

  // スピニング停止
  setTimeout(() => {
    // 【修正点3】利用可能なカスタムをシャッフルし、スロット数だけ取り出すことで重複を防ぐ
    const shuffledCustoms = availableCustoms.sort(() => 0.5 - Math.random());
    const finalCustoms = shuffledCustoms.slice(0, slotCount);
    const finalCustomIdArray = finalCustoms.map((c) => c.id);

    slots.forEach((slot, index) => {
      clearInterval(slot.intervalId);
      slot.classList.remove("spinning");
      // finalCustomsから直接名前を取得
      slot.textContent = finalCustoms[index].name;
    });

    const selectedDrinkId = parseInt(drinkSelect.value);
    const selectedSizeId = parseInt(sizeSelect.value);

    // IDをサーバーに送信
    fetch("/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        drinkId: selectedDrinkId,
        sizeId: selectedSizeId,
        customIds: finalCustomIdArray,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        resultText.innerHTML = `
        ${data.spell} (全${data.spellLength}文字)<br><br>
        <strong>合計金額: ¥${data.totalPrice}</strong><br>
        <strong>合計カロリー: 約${data.totalCalories}kcal</strong><br>
        <small>アレルゲン: ${data.allergens.join(", ") || "なし"}</small>
      `;
      })
      .catch((error) => {
        console.error("計算エラー:", error);
        resultText.textContent = "エラー: 計算に失敗しました。";
      });

    spinButton.disabled = false;
  }, 2000);
});
