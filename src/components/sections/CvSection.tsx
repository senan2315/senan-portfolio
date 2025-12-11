import { SectionShell } from "@/components/ui/section";
import { prisma } from "@/lib/prisma";

async function getCvEntries() {
  try {
    return await prisma.cvEntry.findMany({
      orderBy: [{ category: "asc" }, { startDate: "desc" }]
    });
  } catch (error) {
    console.error("Failed to fetch CV entries:", error);
    return [];
  }
}

function formatDateRange(startDate: Date, endDate: Date | null) {
  const start = new Date(startDate).toLocaleDateString("da-DK", {
    month: "short",
    year: "numeric"
  });
  const end = endDate
    ? new Date(endDate).toLocaleDateString("da-DK", {
        month: "short",
        year: "numeric"
      })
    : "Nu";
  return `${start} - ${end}`;
}

const categoryLabels: Record<string, string> = {
  EDUCATION: "Uddannelse",
  EXPERIENCE: "Erfaring",
  SKILL: "Kompetencer",
  OTHER: "Andet"
};

export default async function CvSection() {
  const entries = await getCvEntries();

  // Group entries by category
  const groupedEntries = entries.reduce(
    (acc, entry) => {
      const category = entry.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(entry);
      return acc;
    },
    {} as Record<string, typeof entries>
  );

  const hasData = entries.length > 0;

  return (
    <SectionShell
      id="cv"
      title="CV"
      eyebrow="Profil & erfaring"
      description="Min uddannelse, erfaring og kompetencer."
    >
      {!hasData ? (
        <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-6 text-slate-300">
          <p className="text-lg font-semibold text-white">
            CV-data bliver indlæst...
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Når databasen indeholder CV-entries, vises de her struktureret efter
            kategori.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedEntries).map(([category, categoryEntries]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                {categoryLabels[category] || category}
              </h3>
              <div className="space-y-4">
                {categoryEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-5"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {entry.organization}
                          {entry.location && ` • ${entry.location}`}
                        </p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        {formatDateRange(entry.startDate, entry.endDate)}
                      </span>
                    </div>
                    {entry.description && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {entry.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
