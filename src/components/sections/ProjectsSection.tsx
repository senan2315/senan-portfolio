import { SectionShell } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";

async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <SectionShell
      id="projects"
      title="Projekter"
      eyebrow="Byggerier"
      description="Et grid der læser fra API/database. Viser projekter i nyeste rækkefølge."
    >
      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-6 text-slate-300">
          <p className="text-lg font-semibold text-white">
            Ingen projekter registreret endnu
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Når databasen indeholder projekter, vises de her med titel, status,
            stack og links.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group rounded-xl border border-slate-800/70 bg-slate-900/70 p-5 shadow-lg transition hover:-translate-y-1 hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-400">
                    {project.type} • {project.status}
                  </p>
                </div>
                {project.featured ? (
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-200">
                    Featured
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {project.shortDescription}
              </p>
              {project.techStack?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {(project.githubUrl || project.liveUrl) && (
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-sky-300">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      className="underline-offset-4 transition hover:underline"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      className="underline-offset-4 transition hover:underline"
                    >
                      Live
                    </a>
                  ) : null}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}


