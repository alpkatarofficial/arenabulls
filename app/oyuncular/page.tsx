import { PlayerCard } from "@/components/players";

export default function PlayersPage() {
  const players = [
    { id: 1, name: "FURIOUS", game: "Valorant", role: "IGL" },
    { id: 2, name: "LEGEND", game: "LoL", role: "Mid" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {players.map(player => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  )
}
