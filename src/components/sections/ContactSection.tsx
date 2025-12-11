"use client";

import { SectionShell } from "@/components/ui/section";
import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message =
          body?.error ??
          "Der opstod en fejl. Prøv igen eller kontakt mig direkte via email.";
        setError(message);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("contact submit error", err);
      setError(
        "Der opstod en fejl. Prøv igen senere eller brug email direkte."
      );
      setStatus("error");
    }
  };

  return (
    <SectionShell
      id="contact"
      title="Kontakt"
      eyebrow="Reach out"
      description="Kontaktinfo og et simpelt formular-layout, koblet til et API-endpoint. Ingen spam/rate-limit endnu."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Email
            </p>
            <a
              href="mailto:senansalah2@gmail.com"
              className="text-base text-white underline-offset-4 transition hover:text-sky-300 hover:underline"
            >
              senansalah2@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Links
            </p>
            <a
              href="https://www.linkedin.com/in/senan-salah-46b18924b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white underline-offset-4 transition hover:text-sky-300 hover:underline"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/senan2315"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white underline-offset-4 transition hover:text-sky-300 hover:underline"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Brug gerne formularen eller kontakt mig direkte via email.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Navn
            </label>
            <input
              type="text"
              placeholder="Dit navn"
              value={form.name}
              onChange={handleChange("name")}
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Email
            </label>
            <input
              type="email"
              placeholder="din@email.dk"
              value={form.email}
              onChange={handleChange("email")}
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Besked
            </label>
            <textarea
              rows={4}
              placeholder="Kort besked"
              value={form.message}
              onChange={handleChange("message")}
              required
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Sender..." : "Send"}
          </button>
          {status === "success" ? (
            <p className="text-xs text-emerald-400">Besked sendt.</p>
          ) : null}
          {status === "error" && error ? (
            <p className="text-xs text-rose-400">{error}</p>
          ) : null}
          {status === "idle" ? (
            <p className="text-xs text-slate-500">
              Data sendes til /api/contact og gemmes i databasen. Ingen
              bekræftelsesmail endnu.
            </p>
          ) : null}
        </form>
      </div>
    </SectionShell>
  );
}


