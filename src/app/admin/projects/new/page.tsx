import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "../../actions/projects";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Nyt projekt</h1>
        <p className="mt-1 text-slate-400">Opret et nyt projekt</p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
