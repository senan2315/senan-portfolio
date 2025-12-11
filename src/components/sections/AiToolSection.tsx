import { SectionShell } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";

const staticTools = [
  "Cursor (IDE)",
  "GPT-5.1 Codex Max",
  "Claude / andre frontier-modeller",
  "Eksperimentelle AI- og devtools"
];

async function getAiTools() {
  try {
    return await prisma.aiToolUsage.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch AI tools:", error);
    return [];
  }
}

export default async function AiToolSection() {
  const aiTools = await getAiTools();
  const hasData = aiTools.length > 0;

  return (
    <SectionShell
      id="ai-tool"
      title="AI Tool"
      eyebrow="AI + Vibe coding"
      description="Hvordan jeg bruger vibe coding og AI-værktøjer til at bygge software og spil hurtigere."
    >
      <div className="space-y-4 text-sm leading-relaxed text-slate-300">
        <p>
          Jeg arbejder med AI-assisteret udvikling og vibe coding for at iterere
          hurtigere på web, værktøjer og kommende spil. Cursor er min IDE, og
          modeller som GPT-5.1 Codex Max (plus andre frontier-modeller) hjælper
          med arkitektur, kode og refaktor.
        </p>
        <div className="space-y-3">
          <p className="text-slate-200">
            Aktuelle værktøjer registreret i systemet:
          </p>
          {hasData ? (
            <div className="grid gap-3">
              {aiTools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">
                        {tool.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                        {tool.role}
                      </p>
                    </div>
                    {tool.link ? (
                      <a
                        href={tool.link}
                        className="text-xs font-semibold text-sky-300 underline-offset-4 transition hover:underline"
                      >
                        Link
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-2 text-slate-300">{tool.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">
              Ingen AI tool entries er gemt endnu. Sektionen er klar til data,
              når de første værktøjer registreres.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-slate-200">Plan for cases, der tilføjes som cards:</p>
          <ul className="space-y-2 text-slate-300">
            <li className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-3 py-2">
              Hvordan denne side blev bygget med AI-hjælp.
            </li>
            <li className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-3 py-2">
              Fremtidige spilprojekter hvor AI har været central i idé, kode og
              iteration.
            </li>
            <li className="rounded-lg border border-slate-800/70 bg-slate-900/70 px-3 py-2">
              Screenshots/videoer af workflows og resultater.
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {staticTools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-100"
            >
              {tool}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          Sektionen kan udvides med tidslinje og case-cards, så processer og
          resultater kan gennemgås trin for trin.
        </p>
      </div>
    </SectionShell>
  );
}


