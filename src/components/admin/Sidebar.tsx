"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

type User = {
  name?: string | null;
  email?: string | null;
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/projects", label: "Projekter", icon: "🔧" },
  { href: "/admin/games", label: "Spil", icon: "🎮" },
  { href: "/admin/ai-tools", label: "AI Tools", icon: "🤖" },
  { href: "/admin/cv", label: "CV", icon: "📄" },
  { href: "/admin/messages", label: "Beskeder", icon: "💬" }
];

export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-900/50">
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-white">
            SS
          </div>
          <div>
            <p className="font-semibold text-white">Admin Panel</p>
            <p className="text-xs text-slate-400">Senan Salah</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-sky-500/10 text-sky-400"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-800 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-slate-300">
            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-white">
              {user.name || "Admin"}
            </p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-center text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Se site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-rose-500/20 hover:text-rose-400"
          >
            Log ud
          </button>
        </div>
      </div>
    </aside>
  );
}
