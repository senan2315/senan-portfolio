import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Allow login page to render without session
  // Middleware handles the actual protection
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <AdminSidebar user={session.user} />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
