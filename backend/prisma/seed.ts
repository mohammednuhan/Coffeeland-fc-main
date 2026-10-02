import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/utils/password";

const username = process.env.SEED_ADMIN_USERNAME ?? "admin";
const email = (process.env.SEED_ADMIN_EMAIL ?? "admin@coffeelandfc.com").toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD ?? "";

async function main() {
  if (password.length < 10) {
    console.error(
      "SEED_ADMIN_PASSWORD must be set and at least 10 characters. Refusing to seed a weak admin password."
    );
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    const existing = await prisma.admin.findUnique({ where: { email } });

    if (existing) {
      await prisma.admin.update({
        where: { email },
        data: { password: await hashPassword(password), role: "superadmin" },
      });
      console.log(`Updated existing admin ${email} and reset its password.`);
      return;
    }

    await prisma.admin.create({
      data: {
        username,
        email,
        password: await hashPassword(password),
        role: "superadmin",
      },
    });

    console.log(`Seeded superadmin ${email}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});