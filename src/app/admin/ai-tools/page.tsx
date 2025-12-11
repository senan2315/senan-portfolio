import { prisma } from "@/lib/prisma";
import { createAiTool, updateAiTool, deleteAiTool } from "../actions/ai-tools";
import DeleteLink from "@/components/admin/DeleteLink";

async function getAiTools() {
  return prisma.aiToolUsage.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export default async function AiToolsPage() {
  const tools = await getAiTools();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Tools</h1>
        <p className="mt-1 text-slate-400">Administrer dine AI-værktøjer</p>
      </div>

      {/* Add new tool form */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Tilføj nyt værktøj</h2>
        <form action={createAiTool} className="grid gap-4 md:grid-cols-2">
          <input
            name="name"
            type="text"
            required
            placeholder="Navn"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
          />
          <input
            name="role"
            type="text"
            required
            placeholder="Rolle (f.eks. IDE, Kodningsassistent)"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
          />
          <input
            name="description"
            type="text"
            required
            placeholder="Beskrivelse"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500 md:col-span-2"
          />
          <input
            name="link"
            type="url"
            placeholder="Link (valgfri)"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
          >
            Tilføj værktøj
          </button>
        </form>
      </div>

      {/* Existing tools */}
      {tools.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-slate-400">Ingen AI-værktøjer endnu</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-6"
            >
              <form action={updateAiTool.bind(null, tool.id)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={tool.name}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
                  />
                  <input
                    name="role"
                    type="text"
                    required
                    defaultValue={tool.role}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
                  />
                  <input
                    name="description"
                    type="text"
                    required
                    defaultValue={tool.description}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500 md:col-span-2"
                  />
                  <input
                    name="link"
                    type="url"
                    defaultValue={tool.link || ""}
                    placeholder="Link (valgfri)"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
                  >
                    Gem ændringer
                  </button>
                </div>
              </form>
              <div className="mt-3">
                <DeleteLink
                  action={deleteAiTool.bind(null, tool.id)}
                  label="Slet værktøj"
                  confirmMessage="Er du sikker på at du vil slette dette værktøj?"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
