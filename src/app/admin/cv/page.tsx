import { prisma } from "@/lib/prisma";
import { createCvEntry, updateCvEntry, deleteCvEntry } from "../actions/cv";
import DeleteLink from "@/components/admin/DeleteLink";

async function getCvEntries() {
  return prisma.cvEntry.findMany({
    orderBy: [{ category: "asc" }, { startDate: "desc" }]
  });
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default async function CvPage() {
  const entries = await getCvEntries();

  const categories = ["EDUCATION", "EXPERIENCE", "SKILL", "OTHER"] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">CV</h1>
        <p className="mt-1 text-slate-400">Administrer dine CV-indgange</p>
      </div>

      {/* Add new entry form */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Tilføj ny indgang</h2>
        <form action={createCvEntry} className="grid gap-4 md:grid-cols-2">
          <select
            name="category"
            required
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
          >
            <option value="EDUCATION">Uddannelse</option>
            <option value="EXPERIENCE">Erfaring</option>
            <option value="SKILL">Kompetence</option>
            <option value="OTHER">Andet</option>
          </select>
          <input
            name="title"
            type="text"
            required
            placeholder="Titel"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
          />
          <input
            name="organization"
            type="text"
            required
            placeholder="Organisation / Sted"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
          />
          <input
            name="location"
            type="text"
            placeholder="Lokation (valgfri)"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
          />
          <div>
            <label className="mb-1 block text-xs text-slate-400">Start dato</label>
            <input
              name="startDate"
              type="date"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Slut dato (tom = nuværende)</label>
            <input
              name="endDate"
              type="date"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
            />
          </div>
          <textarea
            name="description"
            placeholder="Beskrivelse (valgfri)"
            rows={2}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500 md:col-span-2"
          />
          <button
            type="submit"
            className="rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-amber-400 md:col-span-2 md:w-fit"
          >
            Tilføj indgang
          </button>
        </form>
      </div>

      {/* Existing entries grouped by category */}
      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-slate-400">Ingen CV-indgange endnu</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryEntries = entries.filter((e) => e.category === category);
            if (categoryEntries.length === 0) return null;

            const categoryLabels = {
              EDUCATION: "Uddannelse",
              EXPERIENCE: "Erfaring",
              SKILL: "Kompetencer",
              OTHER: "Andet"
            };

            return (
              <div key={category}>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {categoryLabels[category]}
                </h3>
                <div className="space-y-4">
                  {categoryEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-xl border border-slate-800 bg-slate-900/70 p-6"
                    >
                      <form action={updateCvEntry.bind(null, entry.id)} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <select
                            name="category"
                            required
                            defaultValue={entry.category}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
                          >
                            <option value="EDUCATION">Uddannelse</option>
                            <option value="EXPERIENCE">Erfaring</option>
                            <option value="SKILL">Kompetence</option>
                            <option value="OTHER">Andet</option>
                          </select>
                          <input
                            name="title"
                            type="text"
                            required
                            defaultValue={entry.title}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
                          />
                          <input
                            name="organization"
                            type="text"
                            required
                            defaultValue={entry.organization}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
                          />
                          <input
                            name="location"
                            type="text"
                            defaultValue={entry.location || ""}
                            placeholder="Lokation"
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500"
                          />
                          <input
                            name="startDate"
                            type="date"
                            required
                            defaultValue={formatDate(entry.startDate)}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
                          />
                          <input
                            name="endDate"
                            type="date"
                            defaultValue={entry.endDate ? formatDate(entry.endDate) : ""}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-sky-500"
                          />
                          <textarea
                            name="description"
                            rows={2}
                            defaultValue={entry.description || ""}
                            placeholder="Beskrivelse"
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-sky-500 md:col-span-2"
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
                          action={deleteCvEntry.bind(null, entry.id)}
                          label="Slet indgang"
                          confirmMessage="Er du sikker på at du vil slette denne indgang?"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
