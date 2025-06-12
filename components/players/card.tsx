import Image from "next/image"

type Player = {
  id: number
  name: string
  game: string
  role: string
  image?: string
}

export function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <Image 
        src={player.image || "/images/players/placeholder.jpg"} 
        alt={player.name}
        width={200}
        height={200}
        className="rounded-full"
      />
      <h3 className="font-bold mt-2">{player.name}</h3>
      <p className="text-gray-400">{player.game} • {player.role}</p>
    </div>
  )
}
