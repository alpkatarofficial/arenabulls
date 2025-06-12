type Match = {
  id: number
  teams: string[]
  date: string
  game: string
}

export function MatchSchedule({ matches }: { matches: Match[] }) {
  return (
    <div className="space-y-4">
      {matches.map(match => (
        <div key={match.id} className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between">
            <span>{match.teams.join(' vs ')}</span>
            <span className="text-gray-400">{match.date}</span>
          </div>
          <div className="text-[#0099ff] mt-2">{match.game}</div>
        </div>
      ))}
    </div>
  )
}
