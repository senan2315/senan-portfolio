import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import * as readline from "readline";

const prisma = new PrismaClient();

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log("\n🔐 Opret Admin Bruger\n");

  const existingAdmin = await prisma.adminUser.findFirst();
  if (existingAdmin) {
    console.log("⚠️  Der findes allerede en admin bruger:");
    console.log(`   Email: ${existingAdmin.email}`);
    const overwrite = await prompt("\nVil du oprette en ny? (y/n): ");
    if (overwrite.toLowerCase() !== "y") {
      console.log("Afbrudt.\n");
      return;
    }
  }

  const email = await prompt("Email: ");
  if (!email || !email.includes("@")) {
    console.log("❌ Ugyldig email\n");
    return;
  }

  const password = await prompt("Password (min. 8 tegn): ");
  if (!password || password.length < 8) {
    console.log("❌ Password skal være mindst 8 tegn\n");
    return;
  }

  const name = await prompt("Navn (valgfri, tryk Enter for at springe over): ");

  console.log("\nOpretter admin bruger...");

  const hashedPassword = await hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name: name || null
    },
    create: {
      email,
      password: hashedPassword,
      name: name || null
    }
  });

  console.log("\n✅ Admin bruger oprettet!");
  console.log(`   ID: ${admin.id}`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Navn: ${admin.name || "(ikke angivet)"}`);
  console.log("\n🔗 Log ind på: http://localhost:3000/admin/login\n");
}

main()
  .catch((e) => {
    console.error("❌ Fejl:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
