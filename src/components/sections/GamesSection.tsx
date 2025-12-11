import { SectionShell } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";

async function getGames() {
  try {
    return await prisma.game.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return [];
  }
}

export default async function GamesSection() {
  const games = await getGames();

  return (
    <SectionShell
      id="games"
      title="Spil"
      eyebrow="Builds (kommende)"
      description="Sektionen er reserveret til kommende spilprojekter. Jeg har endnu ikke udgivet egne spil, men fokus er at lære, eksperimentere og bygge rigtige titler over de næste år."
    >
      {games.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/50 p-6 text-slate-300">
          <p className="text-lg font-semibold text-white">
            Ingen spil udgivet endnu – coming soon
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Her kommer mine egne spil og prototyper. Grid-layoutet er klar til
            kort med screenshots, status og tech-stack, men data tilføjes, når
            de første titler er klar.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <article
              key={game.id}
              className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-5 shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {game.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">
                    {game.status} {game.engine ? `• ${game.engine}` : ""}
                  </p>
                </div>
                {game.isReleased ? (
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-200">
                    Released
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {game.shortDescription}
              </p>
              {game.repoUrl ? (
                <div className="mt-4 text-sm text-sky-300">
                  <a
                    href={game.repoUrl}
                    className="underline-offset-4 transition hover:underline"
                  >
                    Repo
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}


