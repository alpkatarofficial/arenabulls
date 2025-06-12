import { TeamCard } from "@/components/team";

export default function TeamPage() {
  const teams = [
    { id: 1, name: "Valorant Takımı", logo: "/images/teams/valorant.png" },
    { id: 2, name: "LoL Takımı", logo: "/images/teams/lol.png" }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {teams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  )
}
