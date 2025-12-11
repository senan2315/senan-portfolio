import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  const [projects, games, aiTools, cvEntries, messages] = await Promise.all([
    prisma.project.count(),
    prisma.game.count(),
    prisma.aiToolUsage.count(),
    prisma.cvEntry.count(),
    prisma.contactMessage.count()
  ]);

  return { projects, games, aiTools, cvEntries, messages };
}

async function getRecentMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentMessages = await getRecentMessages();

  const statCards = [
    {
      label: "Projekter",
      value: stats.projects,
      href: "/admin/projects",
      color: "bg-sky-500/10 text-sky-400"
    },
    {
      label: "Spil",
      value: stats.games,
      href: "/admin/games",
      color: "bg-purple-500/10 text-purple-400"
    },
    {
      label: "AI Tools",
      value: stats.aiTools,
      href: "/admin/ai-tools",
      color: "bg-emerald-500/10 text-emerald-400"
    },
    {
      label: "CV Entries",
      value: stats.cvEntries,
      href: "/admin/cv",
      color: "bg-amber-500/10 text-amber-400"
    },
    {
      label: "Beskeder",
      value: stats.messages,
      href: "/admin/messages",
      color: "bg-rose-500/10 text-rose-400"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-slate-400">Overblik over dit indhold</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-slate-700"
          >
            <p className="text-sm font-medium text-slate-400">{card.label}</p>
            <p className={`mt-2 text-3xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Hurtige handlinger</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
          >
            + Nyt projekt
          </Link>
          <Link
            href="/admin/games/new"
            className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-400"
          >
            + Nyt spil
          </Link>
          <Link
            href="/admin/ai-tools"
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
          >
            Administrer AI Tools
          </Link>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Seneste beskeder</h2>
          <Link
            href="/admin/messages"
            className="text-sm text-sky-400 hover:underline"
          >
            Se alle
          </Link>
        </div>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-slate-400">Ingen beskeder endnu</p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="rounded-lg border border-slate-800 bg-slate-800/50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{message.name}</p>
                    <p className="text-xs text-slate-400">{message.email}</p>
                  </div>
                  <time className="text-xs text-slate-500">
                    {new Date(message.createdAt).toLocaleDateString("da-DK")}
                  </time>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
