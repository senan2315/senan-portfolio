import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.contactMessage.deleteMany();
  await prisma.aiToolUsage.deleteMany();
  await prisma.cvEntry.deleteMany();
  await prisma.game.deleteMany();
  await prisma.project.deleteMany();

  // Seed Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        slug: "personal-website",
        title: "Personlig Platform",
        shortDescription:
          "Min personlige hjemmeside bygget med Next.js, Tailwind og Prisma. Viser projekter, spil og AI-tools.",
        longDescription:
          "En moderne single-page applikation med dark theme, responsive design og database-backend. Bygget med AI-assisteret udvikling via Cursor.",
        type: "WEB",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
        status: "IN_PROGRESS",
        featured: true,
        githubUrl: "https://github.com/senan/personal-site",
        liveUrl: null
      }
    }),
    prisma.project.create({
      data: {
        slug: "ai-prompt-helper",
        title: "AI Prompt Helper",
        shortDescription:
          "Værktøj til at strukturere og optimere prompts til forskellige AI-modeller.",
        longDescription: null,
        type: "TOOL",
        techStack: ["React", "Node.js", "OpenAI API"],
        status: "IN_PROGRESS",
        featured: false,
        githubUrl: null,
        liveUrl: null
      }
    })
  ]);

  console.log(`✅ Created ${projects.length} projects`);

  // Seed Games
  const games = await Promise.all([
    prisma.game.create({
      data: {
        slug: "first-prototype",
        title: "Første Prototype",
        shortDescription:
          "Mit første spiludviklingsprojekt - et simpelt 2D platformspil for at lære game mechanics.",
        longDescription:
          "Et læringsprojekt for at forstå grundlæggende spilmekanikker som physics, collision detection og level design.",
        engine: "Godot",
        status: "IDEA",
        repoUrl: null,
        isReleased: false
      }
    }),
    prisma.game.create({
      data: {
        slug: "puzzle-concept",
        title: "Puzzle Koncept",
        shortDescription:
          "Idé til et puzzle-spil med fokus på logik og rumlige udfordringer.",
        longDescription: null,
        engine: "Unity",
        status: "IDEA",
        repoUrl: null,
        isReleased: false
      }
    })
  ]);

  console.log(`✅ Created ${games.length} games`);

  // Seed AI Tools
  const aiTools = await Promise.all([
    prisma.aiToolUsage.create({
      data: {
        name: "Cursor",
        description:
          "Min primære IDE med indbygget AI-assistent. Bruges til al kodning, refaktorering og arkitekturplanlægning.",
        role: "IDE & Kodningsassistent",
        link: "https://cursor.sh"
      }
    }),
    prisma.aiToolUsage.create({
      data: {
        name: "Claude (Anthropic)",
        description:
          "Frontier-model til komplekse resonnementer, kodegennemgang og arkitekturbeslutninger.",
        role: "Reasoning & Code Review",
        link: "https://anthropic.com"
      }
    }),
    prisma.aiToolUsage.create({
      data: {
        name: "ChatGPT / GPT-4",
        description:
          "Generel AI-assistent til brainstorming, research og hurtige svar på tekniske spørgsmål.",
        role: "Generel Assistent",
        link: "https://chat.openai.com"
      }
    })
  ]);

  console.log(`✅ Created ${aiTools.length} AI tools`);

  // Seed CV Entries
  const cvEntries = await Promise.all([
    prisma.cvEntry.create({
      data: {
        category: "EDUCATION",
        title: "Datamatiker",
        organization: "Erhvervsakademi",
        location: "Danmark",
        startDate: new Date("2022-08-01"),
        endDate: null,
        description:
          "Studerer softwareudvikling med fokus på full-stack webudvikling og systemdesign."
      }
    }),
    prisma.cvEntry.create({
      data: {
        category: "SKILL",
        title: "Frontend Development",
        organization: "Tekniske Kompetencer",
        location: null,
        startDate: new Date("2022-01-01"),
        endDate: null,
        description:
          "React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, responsive design."
      }
    }),
    prisma.cvEntry.create({
      data: {
        category: "SKILL",
        title: "Backend Development",
        organization: "Tekniske Kompetencer",
        location: null,
        startDate: new Date("2022-01-01"),
        endDate: null,
        description:
          "Node.js, Express, Prisma, PostgreSQL, REST APIs, database design."
      }
    }),
    prisma.cvEntry.create({
      data: {
        category: "SKILL",
        title: "AI & Vibe Coding",
        organization: "Moderne Udvikling",
        location: null,
        startDate: new Date("2023-01-01"),
        endDate: null,
        description:
          "Erfaring med AI-assisteret udvikling via Cursor, Claude, GPT-4 og andre frontier-modeller."
      }
    })
  ]);

  console.log(`✅ Created ${cvEntries.length} CV entries`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
