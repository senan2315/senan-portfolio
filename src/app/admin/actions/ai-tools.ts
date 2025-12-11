"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const aiToolSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  role: z.string().min(1).max(100),
  link: z.string().url().optional().or(z.literal(""))
});

export async function createAiTool(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    role: formData.get("role") as string,
    link: (formData.get("link") as string) || ""
  };

  const parsed = aiToolSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Ugyldige felter" };
  }

  const { link, ...data } = parsed.data;

  await prisma.aiToolUsage.create({
    data: {
      ...data,
      link: link || null
    }
  });

  revalidatePath("/admin/ai-tools");
  revalidatePath("/");
  return { success: true };
}

export async function updateAiTool(id: string, formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    role: formData.get("role") as string,
    link: (formData.get("link") as string) || ""
  };

  const parsed = aiToolSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Ugyldige felter" };
  }

  const { link, ...data } = parsed.data;

  await prisma.aiToolUsage.update({
    where: { id },
    data: {
      ...data,
      link: link || null
    }
  });

  revalidatePath("/admin/ai-tools");
  revalidatePath("/");
  return { success: true };
}

export async function deleteAiTool(id: string) {
  await prisma.aiToolUsage.delete({ where: { id } });
  revalidatePath("/admin/ai-tools");
  revalidatePath("/");
}
