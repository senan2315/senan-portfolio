"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const projectSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  shortDescription: z.string().min(1).max(500),
  longDescription: z.string().max(5000).optional(),
  type: z.enum(["WEB", "TOOL", "EXPERIMENT", "GAME", "OTHER"]),
  techStack: z.string(), // Comma-separated
  status: z.enum(["IN_PROGRESS", "RELEASED", "ARCHIVED"]),
  featured: z.boolean().default(false),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal(""))
});

export async function createProject(formData: FormData) {
  const raw = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    longDescription: (formData.get("longDescription") as string) || undefined,
    type: formData.get("type") as string,
    techStack: formData.get("techStack") as string,
    status: formData.get("status") as string,
    featured: formData.get("featured") === "on",
    githubUrl: (formData.get("githubUrl") as string) || "",
    liveUrl: (formData.get("liveUrl") as string) || ""
  };

  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Ugyldige felter", issues: parsed.error.issues };
  }

  const { techStack, githubUrl, liveUrl, longDescription, ...data } = parsed.data;

  await prisma.project.create({
    data: {
      ...data,
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      longDescription: longDescription || null
    }
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const raw = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    longDescription: (formData.get("longDescription") as string) || undefined,
    type: formData.get("type") as string,
    techStack: formData.get("techStack") as string,
    status: formData.get("status") as string,
    featured: formData.get("featured") === "on",
    githubUrl: (formData.get("githubUrl") as string) || "",
    liveUrl: (formData.get("liveUrl") as string) || ""
  };

  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Ugyldige felter", issues: parsed.error.issues };
  }

  const { techStack, githubUrl, liveUrl, longDescription, ...data } = parsed.data;

  await prisma.project.update({
    where: { id },
    data: {
      ...data,
      techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      longDescription: longDescription || null
    }
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
