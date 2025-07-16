const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const drinksToCreate = [
  {
    name: "ドリップ コーヒー",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 380,
        calories: 13,
        allergens: ["-"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 420,
        calories: 18,
        allergens: ["-"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 465,
        calories: 24,
        allergens: ["-"],
      },
    ],
  },
  {
    name: "キャラメルフラペチーノ",
    drinkType: "coffee",
    variants: [
      {
        sizeName: "Short",
        volume: 240,
        price: 545,
        calories: 246,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Tall",
        volume: 350,
        price: 590,
        calories: 359,
        allergens: ["乳", "大豆"],
      },
      {
        sizeName: "Grande",
        volume: 470,
        price: 635,
        calories: 462,
        allergens: ["乳", "大豆"],
      },
    ],
  },
];

const customizationsToCreate = [
  {
    name: "ノンファットミルク",
    price: 55,
    calories: 0,
    allergens: ["-"],
    availableFor: ["coffee", "tea"],
  },
  {
    name: "エクストラショット",
    price: 0,
    calories: -80,
    allergens: ["乳"],
    availableFor: ["coffee", "tea"],
  },
  {
    name: "ツーパーセント",
    price: 55,
    calories: 5,
    allergens: ["-"],
    availableFor: ["coffee"],
  },
  {
    name: "ウィズホイップ",
    price: 55,
    calories: 83,
    allergens: ["乳"],
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
