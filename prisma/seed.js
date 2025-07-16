const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const drinksToCreate = [
  // COFFEE
  {
    name: "ドリップ コーヒー",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 390,
        calories: 200,
        allergens: ["-"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 430,
        calories: 300,
        allergens: ["-"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 475,
        calories: 400,
        allergens: ["-"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 520,
        calories: 500,
        allergens: ["-"],
      },
    ],
  },
  {
    name: "カフェ ミスト",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 445,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 485,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 530,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 575,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "コールドブリュー コーヒー",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 440,
        calories: 200,
        allergens: ["-"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 480,
        calories: 300,
        allergens: ["-"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 525,
        calories: 400,
        allergens: ["-"],
      },
    ],
  },
  // ESPRESSO & COFFEE
  {
    name: "スターバックス ラテ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 455,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 495,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 540,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 585,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "ソイ ラテ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 455,
        calories: 200,
        allergens: ["大豆"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 495,
        calories: 300,
        allergens: ["大豆"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 540,
        calories: 400,
        allergens: ["大豆"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 585,
        calories: 500,
        allergens: ["大豆"],
      },
    ],
  },
  {
    name: "アーモンドミルク ラテ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 455,
        calories: 200,
        allergens: ["アーモンド"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 495,
        calories: 300,
        allergens: ["アーモンド"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 540,
        calories: 400,
        allergens: ["アーモンド"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 585,
        calories: 500,
        allergens: ["アーモンド"],
      },
    ],
  },
  {
    name: "オーツミルク ラテ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 455,
        calories: 200,
        allergens: ["-"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 495,
        calories: 300,
        allergens: ["-"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 540,
        calories: 400,
        allergens: ["-"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 585,
        calories: 500,
        allergens: ["-"],
      },
    ],
  },
  {
    name: "ディカフェ ラテ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 510,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 550,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 595,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 640,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "トリプルエスプレッソ ラテ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Tall",
        volume: 350,
        price: 545,
        calories: 300,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "カフェ アメリカーノ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 405,
        calories: 200,
        allergens: ["-"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 445,
        calories: 300,
        allergens: ["-"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 490,
        calories: 400,
        allergens: ["-"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 535,
        calories: 500,
        allergens: ["-"],
      },
    ],
  },
  {
    name: "カプチーノ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 455,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 495,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 540,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 585,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "キャラメル マキアート",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 530,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 570,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 615,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 660,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "カフェ モカ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 530,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 570,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 615,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 660,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "ホワイト モカ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 530,
        calories: 200,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 575,
        calories: 300,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 620,
        calories: 400,
        allergens: ["乳", "大豆"],
      },
    ],
  },
  // TEAVANA
  {
    name: "チャイ ティー ラテ",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 515,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 555,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 600,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 645,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "ゆず シトラス & ティー",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 510,
        calories: 200,
        allergens: ["-"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 550,
        calories: 300,
        allergens: ["-"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 595,
        calories: 400,
        allergens: ["-"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 640,
        calories: 500,
        allergens: ["-"],
      },
    ],
  },
  {
    name: "ほうじ茶 ティー ラテ",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 500,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 540,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 585,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 630,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "アールグレイ ティー ラテ",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 500,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 540,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 585,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 630,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "抹茶 ティー ラテ",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 460,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 500,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 545,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 590,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "イングリッシュ ブレックファスト ティー ラテ",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 500,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 540,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 585,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 630,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "ホット ティー",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Tall",
        volume: 350,
        price: 460,
        calories: 300,
        allergens: ["-"],
      },
    ],
  },
  {
    name: "アイス ティー",
    drinkType: "tea",
    variants: [
      {
        sizeName: "Tall",
        volume: 350,
        price: 460,
        calories: 300,
        allergens: ["-"],
      },
    ],
  },
  // FRAPPUCCINO
  {
    name: "スターバックス ストロベリー フラペチーノ",
    drinkType: "frappuccino",
    variants: [
      {
        sizeName: "Tall",
        volume: 350,
        price: 680,
        calories: 300,
        allergens: ["乳", "大豆"],
      },
    ],
  },
  {
    name: "エスプレッソ アフォガート フラペチーノ",
    drinkType: "frappuccino",
    variants: [
      {
        sizeName: "Tall",
        volume: 350,
        price: 630,
        calories: 300,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "ダーク モカ チップ フラペチーノ",
    drinkType: "frappuccino",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 590,
        calories: 200,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 635,
        calories: 300,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 680,
        calories: 400,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 725,
        calories: 500,
        allergens: ["乳", "大豆"],
      },
    ],
  },
  {
    name: "キャラメル フラペチーノ",
    drinkType: "frappuccino",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 575,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 620,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 665,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 710,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "抹茶 クリーム フラペチーノ",
    drinkType: "frappuccino",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 590,
        calories: 200,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 635,
        calories: 300,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 680,
        calories: 400,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 725,
        calories: 500,
        allergens: ["乳", "大豆"],
      },
    ],
  },
  {
    name: "バニラ クリーム フラペチーノ",
    drinkType: "frappuccino",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 575,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 620,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 665,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 710,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "マンゴー パッション ティー フラペチーノ",
    drinkType: "frappuccino",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 575,
        calories: 200,
        allergens: ["-"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 620,
        calories: 300,
        allergens: ["-"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 665,
        calories: 400,
        allergens: ["-"],
      },
    ],
  },
  // OTHER BEVERAGES
  {
    name: "キャラメル クリーム",
    drinkType: "other",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 495,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 540,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 585,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 630,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
  {
    name: "ココア",
    drinkType: "other",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 495,
        calories: 200,
        allergens: ["乳"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 540,
        calories: 300,
        allergens: ["乳"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 585,
        calories: 400,
        allergens: ["乳"],
      },
      {
        sizeName: "Venti",
        volume: 590,
        price: 630,
        calories: 500,
        allergens: ["乳"],
      },
    ],
  },
];

const customizationsToCreate = [
  {
    name: "ディカフェ",
    price: 55,
    calories: 0,
    allergens: ["-"],
    availableFor: ["coffee", "tea", "frappuccino"],
  },
  {
    name: "ノンファットミルク",
    price: 0,
    calories: -80,
    allergens: ["乳"],
    availableFor: ["all"],
  },
  {
    name: "ツーパーセント",
    price: 0,
    calories: -40,
    allergens: ["乳"],
    availableFor: ["all"],
  },
  {
    name: "フォーミー",
    price: 55,
    calories: -15,
    allergens: ["大豆"],
    availableFor: ["all"],
  },
  {
    name: "ウィズ キャラメルソース",
    price: 55,
    calories: -20,
    allergens: ["アーモンド"],
    availableFor: ["all"],
  },
  {
    name: "エクストラミルク",
    price: 55,
    calories: -5,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "ブラべミルク",
    price: 55,
    calories: 5,
    allergens: ["-"],
    availableFor: ["coffee", "tea", "frappuccino"],
  },
  {
    name: "ウィズホイップ",
    price: 55,
    calories: 83,
    allergens: ["乳"],
    availableFor: ["all"],
  },
  {
    name: "ノンバニラシロップ",
    price: 55,
    calories: 20,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "クワッド",
    price: 0,
    calories: 17,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "エクストラパウダー",
    price: 55,
    calories: 27,
    allergens: ["乳", "大豆"],
    availableFor: ["all"],
  },
  {
    name: "ライトアイス",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "チョコレートソース",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "エキストラホイップ",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "ヘーゼルナッツ",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "アドチップ",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "ノンアイス",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "パーソナル",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "トゥーゴ",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "リストレット",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "ソイ",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
  {
    name: "オールミルク",
    price: 0,
    calories: 0,
    allergens: ["-"],
    availableFor: ["all"],
  },
];

const sizesToCreate = [
  { name: "Short", volume: 240 },
  { name: "Tall", volume: 350 },
  { name: "Grande", volume: 470 },
  { name: "Venti", volume: 590 },
];

async function main() {
  console.log(`Start seeding ...`);
  await prisma.size.createMany({ data: sizesToCreate, skipDuplicates: true });
  await prisma.customization.createMany({
    data: customizationsToCreate,
    skipDuplicates: true,
  });

  for (const drinkData of drinksToCreate) {
    const drink = await prisma.drink.upsert({
      where: { name: drinkData.name },
      update: {},
      create: { name: drinkData.name, drinkType: drinkData.drinkType },
    });

    for (const variantData of drinkData.variants) {
      const size = await prisma.size.findUnique({
        where: { name: variantData.sizeName },
      });
      if (size) {
        await prisma.drinkVariant.upsert({
          where: { drinkId_sizeId: { drinkId: drink.id, sizeId: size.id } },
          update: {
            price: variantData.price,
            calories: variantData.calories,
            allergens: variantData.allergens,
          },
          create: {
            drinkId: drink.id,
            sizeId: size.id,
            price: variantData.price,
            calories: variantData.calories,
            allergens: variantData.allergens,
          },
        });
      }
    }
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
