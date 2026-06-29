const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "eric@sullivan.capital";
  const password = "welcome123";
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      emailVerified: true,
    },
    create: {
      email,
      passwordHash,
      firstName: "Eric",
      lastName: "Sullivan",
      phone: "5555555555",
      emailVerified: true,
    },
  });

  console.log(`Seeded user: ${user.email} (${user.id})`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
