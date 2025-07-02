const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// データベースに追加したいデータ
const drinksData = [
  { name: "ドリップ コーヒー (Hot)", price: 380, calories: 10 },
  { name: "スターバックス ラテ (Hot)", price: 445, calories: 193 },
  { name: "キャラメル マキアート", price: 500, calories: 245 },
  { name: "抹茶 ティー ラテ", price: 495, calories: 226 },
];

const customizationsData = [
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

async function main() {
  console.log(`Start seeding ...`);

  // ドリンクデータを投入
  await prisma.drink.createMany({
    data: drinksData,
    skipDuplicates: true, // 同じ名前のドリンクが既にあればスキップ
  });

  // カスタムデータを投入
  await prisma.customization.createMany({
    data: customizationsData,
    skipDuplicates: true, // 同じ名前のカスタムが既にあればスキップ
  });

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
