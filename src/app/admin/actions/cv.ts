"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const cvEntrySchema = z.object({
  category: z.enum(["EDUCATION", "EXPERIENCE", "SKILL", "OTHER"]),
  title: z.string().min(1).max(200),
  organization: z.string().min(1).max(200),
  location: z.string().max(100).optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  description: z.string().max(2000).optional()
});

export async function createCvEntry(formData: FormData): Promise<void> {
  const raw = {
    category: formData.get("category") as string,
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    location: (formData.get("location") as string) || undefined,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || undefined,
    description: (formData.get("description") as string) || undefined
  };

  const parsed = cvEntrySchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Ugyldige felter");
  }

  const { startDate, endDate, location, description, ...data } = parsed.data;

  await prisma.cvEntry.create({
    data: {
      ...data,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      location: location || null,
      description: description || null
    }
  });

  revalidatePath("/admin/cv");
  revalidatePath("/");
}

export async function updateCvEntry(id: string, formData: FormData): Promise<void> {
  const raw = {
    category: formData.get("category") as string,
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    location: (formData.get("location") as string) || undefined,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || undefined,
    description: (formData.get("description") as string) || undefined
  };

  const parsed = cvEntrySchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Ugyldige felter");
  }

  const { startDate, endDate, location, description, ...data } = parsed.data;

  await prisma.cvEntry.update({
    where: { id },
    data: {
      ...data,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      location: location || null,
      description: description || null
    }
  });

  revalidatePath("/admin/cv");
  revalidatePath("/");
}

export async function deleteCvEntry(id: string): Promise<void> {
  await prisma.cvEntry.delete({ where: { id } });
  revalidatePath("/admin/cv");
  revalidatePath("/");
}
