import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GameForm from "@/components/admin/GameForm";
import { updateGame } from "../../../actions/games";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditGamePage({ params }: Props) {
  const { id } = await params;
  
  const game = await prisma.game.findUnique({
    where: { id }
  });

  if (!game) {
    notFound();
  }

  const updateWithId = updateGame.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Rediger spil</h1>
        <p className="mt-1 text-slate-400">{game.title}</p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <GameForm game={game} action={updateWithId} />
      </div>
    </div>
  );
}
