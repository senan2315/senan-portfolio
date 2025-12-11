import { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  title,
  eyebrow,
  description,
  children
}: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-base text-slate-300">
              {description}
            </p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-surface-border/70 bg-surface-muted/70 p-6 shadow-glow ring-1 ring-slate-800/40">
          {children}
        </div>
      </div>
    </section>
  );
}


