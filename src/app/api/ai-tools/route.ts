import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const aiTools = await prisma.aiToolUsage.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ aiTools });
  } catch (error) {
    console.error("[api/ai-tools] GET error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


