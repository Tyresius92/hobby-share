import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "tyrel@hobbyshare.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("asdfasdf", 10);

  await prisma.user.create({
    data: {
      email,
      username: "tyresius",
      firstName: "Tyrel",
      lastName: "Clayton",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
