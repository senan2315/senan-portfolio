# senan — personlig platform (v1 foundation)

## Owner & Vision
- Senan Salah, 23, læser Datamatiker og arbejder sig mod spiludvikling.
- Brug af AI-assisteret udvikling og vibe coding (Cursor, GPT-5.1 Codex Max og andre frontier-modeller) til web, værktøjer og fremtidige spil.
- Sitet er den personlige hub til at samle projekter, eksperimenter og kommende spil, samt vise AI-setup og proces.

## Formål
- Kort sigt: pænt, funktionelt site med sektionerne OM MIG, PROJEKTER, SPIL, CV, KONTAKT, AI TOOL.
- Langt sigt (12 mdr.): flere spilprojekter, evt. lille devlog/blog, og mere avanceret AI-integration (idé-generering til spil, dashboards over projekter, m.m.).
- Skal kunne udvides løbende i mindst et år (blog, dashboards, spil, data, admin). Single-page nu, men nemt at splitte ud til egne sider.

## Stack (v1)
- **Next.js (App Router, TypeScript)** — seneste stabile version.
- **Tailwind CSS** til styling, mørkt tema som standard.
- **Prisma + PostgreSQL** til data. API via Next Route Handlers (`src/app/api/...`).
- Alias: `@/*` peger på `src/*`.
- Miljøvariabel: `DATABASE_URL` (se `env.example`); forventet Postgres (lokalt eller managed).

## Informationsarkitektur (nav + sektioner)
- Sticky top-nav med anchor-links: OM MIG, PROJEKTER, SPIL, CV, KONTAKT, AI TOOL.
- V1: alle sektioner ligger på forsiden (`/`), men komponentstrukturen er klar til at flyttes til egne routes.

## Sektioner (status nu + næste skridt)
- **OM MIG**: Kort, faktuel intro: 23 år, Datamatiker-studerende, på vej mod spiludvikling; bruger AI/vibe coding til web, værktøjer og spil. Tekst opdateres løbende af Senan.
- **PROJEKTER**: Grid der henter data fra `/api/projects` (Prisma/Postgres). Viser projekter i nyeste rækkefølge; tom-tilstand håndteres.
- **SPIL**: Grid-layout, data fra `/api/games`. Viser kommende game-projekter; tom-tilstand med klar tekst om ingen udgivelser endnu.
- **CV**: Placeholder timeline/sektioner for uddannelse, erfaring, skills. Note: CV-PDF skal parses/summary’zes til databasen (model `CvEntry`) og evt. tilføje PDF-download.
- **KONTAKT**: Formular sender til `/api/contact`, validerer og gemmer i `ContactMessage`. Ingen rate-limiting/spam-filter endnu.
- **AI TOOL**: Henter registrerede AI-værktøjer fra `/api/ai-tools` (model `AiToolUsage`) når data findes; viser også plan for kommende cases (fx hvordan siden blev bygget, AI i spil, screenshots/videoer).

## Arkitektur-noter
- **Struktur**: `src/app` for routes/layout og API-route handlers, `src/components` for delte layout- og sektion-komponenter, `src/components/ui` for generelle shells. Nav-data og sektioner kan flyttes til dedikerede sider senere.
- **Styling**: Tailwind, dark theme by default (`bg-slate-950` osv.). Globale helper-classes til scroll-behavior og skjult scrollbar.
- **Data/backend**: Prisma + Postgres via `DATABASE_URL`. APIer under `src/app/api/*` (projects, games, ai-tools, contact). `src/lib/prisma.ts` håndterer singleton-klient til hot-reload.
- **Fleksibilitet**: SectionShell standardiserer spacing + kortvisning. Data hentes via API og kan udskiftes med database/seed. Alias `@/*` for rene imports.
- **Ekstraktion**: Koden kan flyttes til separat API-service senere; modeller og routes er organiseret efter ressource.

## Domænemodeller (Prisma)
- `Project`: slug, title, short/long description, type, techStack[], status, featured, githubUrl, liveUrl, timestamps. Knyttes til PROJEKTER.
- `Game`: slug, title, descriptions, engine, status, repoUrl, isReleased, timestamps. Knyttes til SPIL.
- `AiToolUsage`: name, description, role, link, timestamps. Knyttes til AI TOOL.
- `CvEntry`: category (education/experience/skill/other), title, organization, location, dates, description, timestamps. Knyttes til CV.
- `ContactMessage`: name, email, message, createdAt. Knyttes til KONTAKT.

## Roadmap (12 måneders udsyn, forslag)
- Blog/notes med MDX + CMS-lite (admin-panel til at redigere indhold).
- Projekter/spil: database + filer/billeder, filter/sortering, status-tags, måske live builds for spil.
- Auth (kun hvis admin): basic email/pass eller magic links; RBAC for admin-panel.
- Kontakt-API med queue/anti-spam; evt. CRM-lignende view og notifikationer.
- AI-sektion: case-cards med prompt → løsning → resultat, upload af screenshots/demos, evt. embed af sandbox.
- Observability: logging/analytics (PostHog/OG), audit-logs i admin.
- Infra: CI (lint/test/build), previews, senere deployment til Vercel eller container.

## Implementeret i iteration (backend v1)
- Next.js + TS + Tailwind config og alias.
- Prisma + Postgres skema (Project, Game, AiToolUsage, CvEntry, ContactMessage).
- API-route handlers for projects, games, ai-tools (GET) og contact (POST).
- Sektioner wired til API (projekter, spil, AI tools) + kontaktformular sender til backend.

## Bevidst udskudt
- Auth/admin-backoffice til at oprette/rette projekter, spil, CV, AI tools.
- Bedre validering, rate-limits, anti-spam, notifikationer for kontaktformular.
- Rigtige projekt-/spildata og CV-indhold (skal importeres/seedes).
- Tests og CI, analytics/observability.

## Setup & kørsel (efter deps er installeret)
1) `npm install`
2) `npm run dev`
3) Åbn `http://localhost:3000`


