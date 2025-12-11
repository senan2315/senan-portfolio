"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const gameSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  shortDescription: z.string().min(1).max(500),
  longDescription: z.string().max(5000).optional(),
  engine: z.string().max(100).optional(),
  status: z.enum(["IDEA", "PROTOTYPE", "IN_DEVELOPMENT", "RELEASED"]),
  repoUrl: z.string().url().optional().or(z.literal("")),
  isReleased: z.boolean().default(false)
});

export async function createGame(formData: FormData) {
  const raw = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    longDescription: (formData.get("longDescription") as string) || undefined,
    engine: (formData.get("engine") as string) || undefined,
    status: formData.get("status") as string,
    repoUrl: (formData.get("repoUrl") as string) || "",
    isReleased: formData.get("isReleased") === "on"
  };

  const parsed = gameSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Ugyldige felter", issues: parsed.error.issues };
  }

  const { repoUrl, longDescription, engine, ...data } = parsed.data;

  await prisma.game.create({
    data: {
      ...data,
      repoUrl: repoUrl || null,
      longDescription: longDescription || null,
      engine: engine || null
    }
  });

  revalidatePath("/admin/games");
  revalidatePath("/");
  redirect("/admin/games");
}

export async function updateGame(id: string, formData: FormData) {
  const raw = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    shortDescription: formData.get("shortDescription") as string,
    longDescription: (formData.get("longDescription") as string) || undefined,
    engine: (formData.get("engine") as string) || undefined,
    status: formData.get("status") as string,
    repoUrl: (formData.get("repoUrl") as string) || "",
    isReleased: formData.get("isReleased") === "on"
  };

  const parsed = gameSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Ugyldige felter", issues: parsed.error.issues };
  }

  const { repoUrl, longDescription, engine, ...data } = parsed.data;

  await prisma.game.update({
    where: { id },
    data: {
      ...data,
      repoUrl: repoUrl || null,
      longDescription: longDescription || null,
      engine: engine || null
    }
  });

  revalidatePath("/admin/games");
  revalidatePath("/");
  redirect("/admin/games");
}

export async function deleteGame(id: string) {
  await prisma.game.delete({ where: { id } });
  revalidatePath("/admin/games");
  revalidatePath("/");
}
