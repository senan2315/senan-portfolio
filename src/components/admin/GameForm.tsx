"use client";

import { useActionState } from "react";
import Link from "next/link";

type Game = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  engine: string | null;
  status: string;
  repoUrl: string | null;
  isReleased: boolean;
};

type Props = {
  game?: Game;
  action: (formData: FormData) => Promise<{ error?: string; issues?: unknown[] } | void>;
};

export default function GameForm({ game, action }: Props) {
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      return await action(formData);
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Titel *
          </label>
          <input
            name="title"
            type="text"
            required
            defaultValue={game?.title}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            placeholder="Mit spil"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Slug *
          </label>
          <input
            name="slug"
            type="text"
            required
            defaultValue={game?.slug}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            placeholder="mit-spil"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Kort beskrivelse *
        </label>
        <input
          name="shortDescription"
          type="text"
          required
          defaultValue={game?.shortDescription}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          placeholder="En kort beskrivelse af spillet"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Lang beskrivelse
        </label>
        <textarea
          name="longDescription"
          rows={4}
          defaultValue={game?.longDescription || ""}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          placeholder="Detaljeret beskrivelse (valgfri)"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Engine
          </label>
          <input
            name="engine"
            type="text"
            defaultValue={game?.engine || ""}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            placeholder="Godot, Unity, etc."
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Status *
          </label>
          <select
            name="status"
            required
            defaultValue={game?.status || "IDEA"}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="IDEA">Idea</option>
            <option value="PROTOTYPE">Prototype</option>
            <option value="IN_DEVELOPMENT">In Development</option>
            <option value="RELEASED">Released</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              name="isReleased"
              type="checkbox"
              defaultChecked={game?.isReleased}
              className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-500/20"
            />
            <span className="text-sm text-slate-300">Released</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Repository URL
        </label>
        <input
          name="repoUrl"
          type="url"
          defaultValue={game?.repoUrl || ""}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          placeholder="https://github.com/..."
        />
      </div>

      <div className="flex gap-3 border-t border-slate-800 pt-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-purple-500 px-6 py-2.5 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Gemmer..." : game ? "Opdater spil" : "Opret spil"}
        </button>
        <Link
          href="/admin/games"
          className="rounded-lg border border-slate-700 bg-slate-800 px-6 py-2.5 font-medium text-slate-300 transition hover:bg-slate-700"
        >
          Annuller
        </Link>
      </div>
    </form>
  );
}
