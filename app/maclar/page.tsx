import { MatchSchedule } from "@/components/matches";

export default function MatchesPage() {
  const matches = [
    { 
      id: 1, 
      teams: ["Arena Bulls", "Team B"], 
      date: "2025-07-15", 
      game: "Valorant" 
    }
  ];

  return (
    <div>
      <MatchSchedule matches={matches} />
    </div>
  )
}
