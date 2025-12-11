import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "../../../actions/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  const updateWithId = updateProject.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Rediger projekt</h1>
        <p className="mt-1 text-slate-400">{project.title}</p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <ProjectForm project={project} action={updateWithId} />
      </div>
    </div>
  );
}
