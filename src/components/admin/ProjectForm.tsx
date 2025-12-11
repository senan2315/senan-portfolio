"use client";

import { useActionState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  type: string;
  techStack: string[];
  status: string;
  featured: boolean;
  githubUrl: string | null;
  liveUrl: string | null;
};

type Props = {
  project?: Project;
  action: (formData: FormData) => Promise<{ error?: string; issues?: unknown[] } | void>;
};

export default function ProjectForm({ project, action }: Props) {
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
            defaultValue={project?.title}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            placeholder="Mit projekt"
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
            defaultValue={project?.slug}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            placeholder="mit-projekt"
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
          defaultValue={project?.shortDescription}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          placeholder="En kort beskrivelse af projektet"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Lang beskrivelse
        </label>
        <textarea
          name="longDescription"
          rows={4}
          defaultValue={project?.longDescription || ""}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          placeholder="Detaljeret beskrivelse (valgfri)"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Type *
          </label>
          <select
            name="type"
            required
            defaultValue={project?.type || "WEB"}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="WEB">Web</option>
            <option value="TOOL">Tool</option>
            <option value="EXPERIMENT">Experiment</option>
            <option value="GAME">Game</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Status *
          </label>
          <select
            name="status"
            required
            defaultValue={project?.status || "IN_PROGRESS"}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RELEASED">Released</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={project?.featured}
              className="h-5 w-5 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500/20"
            />
            <span className="text-sm text-slate-300">Featured</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Tech Stack (kommasepareret)
        </label>
        <input
          name="techStack"
          type="text"
          defaultValue={project?.techStack.join(", ") || ""}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          placeholder="Next.js, TypeScript, Tailwind CSS"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            GitHub URL
          </label>
          <input
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl || ""}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Live URL
          </label>
          <input
            name="liveUrl"
            type="url"
            defaultValue={project?.liveUrl || ""}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex gap-3 border-t border-slate-800 pt-6">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-sky-500 px-6 py-2.5 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Gemmer..." : project ? "Opdater projekt" : "Opret projekt"}
        </button>
        <Link
          href="/admin/projects"
          className="rounded-lg border border-slate-700 bg-slate-800 px-6 py-2.5 font-medium text-slate-300 transition hover:bg-slate-700"
        >
          Annuller
        </Link>
      </div>
    </form>
  );
}
