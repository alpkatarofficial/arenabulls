"use client"

import { useState } from "react"
import { CalendarDays, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getAllMatches } from "@/lib/matches"

export function LatestMatches() {
  const matches = getAllMatches()
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredMatches = matches.filter((match) => {
    if (activeFilter === "upcoming") return match.status === "upcoming"
    if (activeFilter === "completed") return match.status === "completed"
    return true
  })

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#0099ff]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-[#0099ff] font-semibold text-sm tracking-wider">MAÇ TAKVİMİ</span>
          </div>
          <h2 className="hero-title text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white via-[#0099ff] to-white bg-clip-text text-transparent">
            FİKSTÜR VE SON KARŞILAŞMALAR
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-10 bg-[#0099ff]/30 rounded-full"></div>
            <div className="h-1 w-20 bg-[#0099ff] rounded-full"></div>
            <div className="h-1 w-10 bg-[#0099ff]/30 rounded-full"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-400 relative">
            <span className="relative z-10">
              Arena Bulls'un güncel maç programını, skorları ve gelecek mücadelelerini bu alandan takip edebilirsin.
            </span>
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[80px] text-[#0099ff]/5 font-bold z-0">
              MATCHES
            </span>
          </p>
        </div>

        <div className="mb-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-[#111111] rounded-full p-1">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === "all" ? "bg-[#0099ff] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Tüm Maçlar
              </button>
              <button
                onClick={() => setActiveFilter("upcoming")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === "upcoming" ? "bg-[#0099ff] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Yaklaşan
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === "completed" ? "bg-[#0099ff] text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Tamamlanan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className={`bg-gradient-to-br ${
                  match.status === "completed"
                    ? match.result === "win"
                      ? "from-[#111111] to-green-950/30"
                      : "from-[#111111] to-red-950/30"
                    : "from-[#111111] to-[#001a33]"
                } rounded-xl overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#0099ff]/10`}
              >
                <div className="border-b border-gray-800 px-6 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        match.status === "upcoming"
                          ? "bg-yellow-500"
                          : match.result === "win"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-sm font-medium text-[#0099ff]">{match.game}</span>
                  </div>
                  <div className="text-xs text-gray-400">{match.tournament}</div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <CalendarDays className="h-4 w-4 text-[#0099ff]" />
                      <span className="text-sm text-gray-300">
                        {new Date(match.date).toLocaleDateString("tr-TR")} - {match.time}
                      </span>
                    </div>
                    {match.status === "upcoming" ? (
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">Yaklaşan</span>
                    ) : match.result === "win" ? (
                      <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full flex items-center">
                        <Trophy className="h-3 w-3 mr-1" />
                        Zafer
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full">Mağlubiyet</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="relative h-20 w-20 mx-auto mb-3 bg-black/30 rounded-full p-2">
                        <Image
                          src={match.teamA.logo || "/placeholder.svg"}
                          alt={match.teamA.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <p className="font-medium">{match.teamA.name}</p>
                    </div>

                    <div className="text-center">
                      {match.status === "completed" ? (
                        <div className="text-3xl font-bold">
                          <span className={match.result === "win" ? "text-green-500" : "text-white"}>
                            {match.teamA.score}
                          </span>
                          <span className="mx-2 text-gray-600">:</span>
                          <span className={match.result === "win" ? "text-white" : "text-red-500"}>
                            {match.teamB.score}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <div className="text-2xl font-bold text-[#0099ff] mb-1">VS</div>
                          <div className="text-xs text-gray-400 px-4 py-1 rounded-full border border-gray-800">
                            {match.time}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <div className="relative h-20 w-20 mx-auto mb-3 bg-black/30 rounded-full p-2">
                        <Image
                          src={match.teamB.logo || "/placeholder.svg"}
                          alt={match.teamB.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <p className="font-medium">{match.teamB.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/mac-takvimi">
            <Button className="bg-[#0099ff] hover:bg-[#0099ff]/80">TÜM MAÇ TAKVİMİ</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
