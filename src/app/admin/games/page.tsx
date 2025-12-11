import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteGame } from "../actions/games";
import DeleteButton from "@/components/admin/DeleteButton";

async function getGames() {
  return prisma.game.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export default async function GamesPage() {
  const games = await getGames();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Spil</h1>
          <p className="mt-1 text-slate-400">Administrer dine spilprojekter</p>
        </div>
        <Link
          href="/admin/games/new"
          className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-400"
        >
          + Nyt spil
        </Link>
      </div>

      {games.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
          <p className="text-slate-400">Ingen spil endnu</p>
          <Link
            href="/admin/games/new"
            className="mt-4 inline-block text-sm text-purple-400 hover:underline"
          >
            Opret dit første spil
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
                  Engine
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Released
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {games.map((game) => (
                <tr key={game.id} className="bg-slate-900/30 hover:bg-slate-900/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{game.title}</p>
                      <p className="text-xs text-slate-400">{game.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {game.engine ? (
                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                        {game.engine}
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        game.status === "RELEASED"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : game.status === "IN_DEVELOPMENT"
                          ? "bg-amber-500/20 text-amber-400"
                          : game.status === "PROTOTYPE"
                          ? "bg-sky-500/20 text-sky-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {game.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {game.isReleased ? (
                      <span className="text-emerald-400">✓</span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/games/${game.id}/edit`}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
                      >
                        Rediger
                      </Link>
                      <DeleteButton
                        action={deleteGame.bind(null, game.id)}
                        confirmMessage="Er du sikker på at du vil slette dette spil?"
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
