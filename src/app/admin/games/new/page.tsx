import GameForm from "@/components/admin/GameForm";
import { createGame } from "../../actions/games";

export default function NewGamePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Nyt spil</h1>
        <p className="mt-1 text-slate-400">Opret et nyt spilprojekt</p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <GameForm action={createGame} />
      </div>
    </div>
  );
}
