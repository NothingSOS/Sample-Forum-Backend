import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const foodCategory = await prisma.forumCategory.upsert({
    where: { name: "Food" },
    update: {},
    create: {
      name: "Food",
      description: "Talking about food around the world",
      status: true,
    },
  });

  const gameCategory = await prisma.forumCategory.upsert({
    where: { name: "Game" },
    update: {},
    create: {
      name: "Game",
      description: "Everything about games",
      status: true,
    },
  });

  console.log({ foodCategory, gameCategory });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
