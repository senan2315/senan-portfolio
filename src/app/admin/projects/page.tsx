import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProject } from "../actions/projects";
import DeleteButton from "@/components/admin/DeleteButton";

async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projekter</h1>
          <p className="mt-1 text-slate-400">Administrer dine projekter</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
        >
          + Nyt projekt
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-slate-400">Ingen projekter endnu</p>
          <Link
            href="/admin/projects/new"
            className="mt-4 inline-block text-sm text-sky-400 hover:underline"
          >
            Opret dit første projekt
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full">
            <thead className="border-b border-slate-800 bg-slate-900/70">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Titel
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Featured
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.map((project) => (
                <tr key={project.id} className="bg-slate-900/30 hover:bg-slate-900/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{project.title}</p>
                      <p className="text-xs text-slate-400">{project.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                      {project.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        project.status === "RELEASED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : project.status === "IN_PROGRESS"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {project.featured ? (
                      <span className="text-sky-400">★</span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
                      >
                        Rediger
                      </Link>
                      <DeleteButton
                        action={deleteProject.bind(null, project.id)}
                        confirmMessage="Er du sikker på at du vil slette dette projekt?"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
