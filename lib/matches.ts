export interface MatchTeam {
  name: string
  logo: string
  score?: number | null
}

export interface Match {
  id: string
  game: "VALORANT" | "LEAGUE OF LEGENDS" | "FC 25" | "COUNTER STRIKE 2" | "APEX LEGENDS" | "ROCKET LEAGUE"
  tournament: string
  date: string
  time: string
  teamA: MatchTeam
  teamB: MatchTeam
  status: "upcoming" | "completed" | "live"
  result?: "win" | "loss" | null
  createdAt: Date
  updatedAt: Date
}

// In-memory storage for development
const matchStorage: Match[] = [
  {
    id: "1",
    game: "VALORANT",
    tournament: "VCT 2025 - Türkiye Ligi",
    date: "2025-05-21",
    time: "19:00",
    teamA: {
      name: "Arena Bulls",
      logo: "/images/logo.png",
      score: 13,
    },
    teamB: {
      name: "Phoenix Fury",
      logo: "/images/teams/phoenix-fury.png",
      score: 7,
    },
    status: "completed",
    result: "win",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    game: "LEAGUE OF LEGENDS",
    tournament: "TCL 2025 Yaz Mevsimi",
    date: "2025-05-25",
    time: "17:00",
    teamA: {
      name: "Arena Bulls",
      logo: "/images/logo.png",
      score: null,
    },
    teamB: {
      name: "Blue Wolves",
      logo: "/images/teams/blue-wolves.png",
      score: null,
    },
    status: "upcoming",
    result: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    game: "FC 25",
    tournament: "FIFA eWorld Cup Elemeleri",
    date: "2025-05-18",
    time: "20:00",
    teamA: {
      name: "Arena Bulls",
      logo: "/images/logo.png",
      score: 2,
    },
    teamB: {
      name: "Red Bulls",
      logo: "/images/teams/red-bulls.png",
      score: 1,
    },
    status: "completed",
    result: "win",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    game: "COUNTER STRIKE 2",
    tournament: "ESL Pro League 2025",
    date: "2025-05-27",
    time: "21:00",
    teamA: {
      name: "Arena Bulls",
      logo: "/images/logo.png",
      score: null,
    },
    teamB: {
      name: "Ninjas in Pyjamas",
      logo: "/images/teams/ninja.png",
      score: null,
    },
    status: "upcoming",
    result: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function getAllMatches(): Match[] {
  return [...matchStorage].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getUpcomingMatches(): Match[] {
  return matchStorage
    .filter((match) => match.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4)
}

export function getCompletedMatches(): Match[] {
  return matchStorage
    .filter((match) => match.status === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
}

export function getMatchById(id: string): Match | undefined {
  return matchStorage.find((match) => match.id === id)
}

export function createMatch(match: Omit<Match, "id" | "createdAt" | "updatedAt">): Match {
  const newMatch: Match = {
    ...match,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  matchStorage.push(newMatch)
  return newMatch
}

export function updateMatch(id: string, updates: Partial<Match>): Match | null {
  const index = matchStorage.findIndex((match) => match.id === id)
  if (index === -1) return null

  matchStorage[index] = {
    ...matchStorage[index],
    ...updates,
    updatedAt: new Date(),
  }
  return matchStorage[index]
}

export function deleteMatch(id: string): boolean {
  const index = matchStorage.findIndex((match) => match.id === id)
  if (index === -1) return false

  matchStorage.splice(index, 1)
  return true
}

export function getGameOptions() {
  return ["VALORANT", "LEAGUE OF LEGENDS", "FC 25", "COUNTER STRIKE 2", "APEX LEGENDS", "ROCKET LEAGUE"]
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    upcoming: "Yaklaşan",
    completed: "Tamamlanan",
    live: "Canlı",
  }
  return labels[status] || status
}

export function getResultLabel(result: string | null): string {
  const labels: Record<string, string> = {
    win: "Zafer",
    loss: "Mağlubiyet",
  }
  return result ? labels[result] || result : "Belirsiz"
}
