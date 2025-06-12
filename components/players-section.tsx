"use client"

import Link from "next/link"
import { Instagram, Twitter, Twitch } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PlayersSection() {
  const [selectedGame, setSelectedGame] = useState("valorant")

  const players = [
    {
      id: 1,
      name: "FURKAN",
      nickname: "FURIOUSS",
      role: "Valorant - Duelist",
      game: "valorant",
      character: {
        agent: "Jett",
        specialty: "Entry Fragger",
        achievement: "VCT 2024 Türkiye MVP",
        stats: "1.45 K/D Oranı",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      id: 2,
      name: "MEHMET",
      nickname: "STRIKER",
      role: "Valorant - Controller",
      game: "valorant",
      character: {
        agent: "Omen",
        specialty: "Stratejist",
        achievement: "En İyi Smoke Kullanıcısı 2024",
        stats: "7.2 Asist Ortalaması",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      id: 3,
      name: "EMRE",
      nickname: "PHANTOM",
      role: "League of Legends - Mid",
      game: "league-of-legends",
      character: {
        champion: "Zed, Syndra",
        specialty: "Assassin Oyuncusu",
        achievement: "TCL All-Star 2024",
        stats: "4.2 KDA Oranı",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      id: 4,
      name: "CAN",
      nickname: "LEGEND",
      role: "FC 25 - Pro Player",
      game: "fc-25",
      character: {
        formation: "4-3-3",
        specialty: "Hızlı Hücum",
        achievement: "FC 25 Türkiye Şampiyonu",
        stats: "152-24-8 Sezon Rekoru",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      id: 5,
      name: "AHMET",
      nickname: "SNIPER",
      role: "Counter Strike 2 - AWPer",
      game: "counter-strike-2",
      character: {
        weapon: "AWP",
        specialty: "Long Range Specialist",
        achievement: "ESL Pro League MVP",
        stats: "1.68 K/D Oranı",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      id: 6,
      name: "BURAK",
      nickname: "SHADOW",
      role: "League of Legends - Jungle",
      game: "league-of-legends",
      character: {
        champion: "Lee Sin, Elise",
        specialty: "Early Game Pressure",
        achievement: "TCL Spring Split MVP",
        stats: "5.1 KDA Oranı",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      id: 7,
      name: "SERKAN",
      nickname: "EAGLE",
      role: "Valorant - Sentinel",
      game: "valorant",
      character: {
        agent: "Cypher",
        specialty: "Site Anchor",
        achievement: "VCT EMEA Finalist",
        stats: "1.32 K/D Oranı",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      id: 8,
      name: "MERT",
      nickname: "GOAL",
      role: "FC 25 - Pro Player",
      game: "fc-25",
      character: {
        formation: "4-2-3-1",
        specialty: "Possession Play",
        achievement: "FC 25 World Cup Finalist",
        stats: "145-15-10 Sezon Rekoru",
      },
      social: {
        instagram: "#",
        twitter: "#",
        twitch: "#",
      },
    },
  ]

  const games = [
    { id: "valorant", name: "VALORANT" },
    { id: "league-of-legends", name: "LEAGUE OF LEGENDS" },
    { id: "fc-25", name: "FC 25" },
    { id: "counter-strike-2", name: "COUNTER STRIKE 2" },
  ]

  const filteredPlayers = players.filter((player) => player.game === selectedGame)

  return (
    <section className="py-20 bg-gradient-to-b from-[#111111] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="hero-title text-4xl md:text-5xl mb-4">OYUNCULARIMIZ</h2>
          <div className="w-20 h-1 bg-[#0099ff] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-400">Arena Bulls'un yıldız oyuncuları ile tanışın.</p>
        </div>

        <Tabs defaultValue="valorant" value={selectedGame} onValueChange={setSelectedGame} className="mb-12">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent">
            {games.map((game) => (
              <TabsTrigger
                key={game.id}
                value={game.id}
                className="bg-[#111111] border border-[#222222] hover:bg-[#0099ff]/10 data-[state=active]:bg-[#0099ff] data-[state=active]:text-white px-6 py-2 rounded-md transition-all"
              >
                {game.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="player-card bg-[#111111] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,153,255,0.3)]"
            >
              <div className="relative h-80 bg-gradient-to-b from-[#0099ff]/20 to-[#111111]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-[#0099ff]/30">{player.nickname}</div>
                </div>
                <div className="player-overlay absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4">
                  <div className="mb-4">
                    <div className="bg-black/60 backdrop-blur-sm p-3 rounded-md mb-3">
                      {player.character && (
                        <>
                          {player.character.agent && (
                            <p className="text-xs text-[#0099ff] font-medium mb-1">{player.character.agent}</p>
                          )}
                          {player.character.champion && (
                            <p className="text-xs text-[#0099ff] font-medium mb-1">{player.character.champion}</p>
                          )}
                          {player.character.formation && (
                            <p className="text-xs text-[#0099ff] font-medium mb-1">{player.character.formation}</p>
                          )}
                          {player.character.weapon && (
                            <p className="text-xs text-[#0099ff] font-medium mb-1">{player.character.weapon}</p>
                          )}
                          <p className="text-xs text-white mb-1">{player.character.specialty}</p>
                          <p className="text-xs text-green-400 mb-1">{player.character.achievement}</p>
                          <p className="text-xs text-gray-300">{player.character.stats}</p>
                        </>
                      )}
                    </div>
                    <div className="flex justify-center space-x-4">
                      <a href={player.social.instagram} className="text-white hover:text-[#0099ff]">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href={player.social.twitter} className="text-white hover:text-[#0099ff]">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href={player.social.twitch} className="text-white hover:text-[#0099ff]">
                        <Twitch className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 text-center">
                <Link href={`/oyuncu/${player.id}`}>
                  <h3 className="hero-title text-2xl text-[#0099ff] hover:underline">{player.nickname}</h3>
                </Link>
                <p className="text-sm text-gray-400">{player.name}</p>
                <p className="text-xs mt-1 text-gray-500">{player.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/takim">
            <button className="bg-transparent hover:bg-[#0099ff] border-2 border-[#0099ff] text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300">
              TÜM OYUNCULARIMIZ
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
