import Image from "next/image"

type Team = {
  id: number
  name: string
  logo: string
}

export function TeamCard({ team }: { team: Team }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <Image 
        src={team.logo} 
        alt={team.name}
        width={150}
        height={150}
        className="mx-auto"
      />
      <h3 className="text-xl font-bold mt-4">{team.name}</h3>
    </div>
  )
}
