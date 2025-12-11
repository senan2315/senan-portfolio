const navLinks = [
  { label: "OM MIG", href: "#about" },
  { label: "PROJEKTER", href: "#projects" },
  { label: "SPIL", href: "#games" },
  { label: "CV", href: "#cv" },
  { label: "KONTAKT", href: "#contact" },
  { label: "AI TOOL", href: "#ai-tool" }
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-semibold">
            SS
          </div>
          <span>Senan Salah</span>
        </div>
        <nav className="hide-scrollbar flex items-center gap-4 overflow-x-auto text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 md:gap-6 md:text-[11px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition hover:bg-slate-800/70 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}


