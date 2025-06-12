import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { NewsSlider } from "@/components/news-slider"

export function GamesSection() {
  const games = [
    {
      id: "valorant",
      title: "VALORANT",
      image: "/images/games/valorant.png",
      description: "Türkiye'nin yükselen FPS arenasında Arena Bulls kadrosuyla yerini aldı.",
      link: "/takim/valorant",
    },
    {
      id: "lol",
      title: "LEAGUE OF LEGENDS",
      image: "/images/games/league-of-legends.jpeg",
      description:
        "League of Legends takımımız, rekabetçi sahnede yıllardır edindiği tecrübe ile her maçta en iyisini ortaya koyuyor.",
      link: "/takim/lol",
    },
    {
      id: "fifa",
      title: "FC 25",
      image: "/images/games/fc-25.jpeg",
      description:
        "FC 25 kadromuz, yetenekli oyunculardan oluşuyor ve ulusal ve uluslararası turnuvalarda başarılar elde ediyor.",
      link: "/takim/fifa",
    },
    {
      id: "cs2",
      title: "COUNTER STRIKE 2",
      image: "/images/games/counter-strike-2.png",
      description:
        "Counter Strike 2 takımımız, stratejik oyun anlayışı ve keskin nişancılık yetenekleriyle uluslararası arenada mücadele ediyor.",
      link: "/takim/cs2",
    },
  ]

  return (
    <section className="py-20 bg-[#111111]">
      <div className="container mx-auto px-4">
        {/* News Slider */}
        <NewsSlider />

        {/* Games Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="hero-title text-4xl md:text-5xl mb-4">OYUNLARIMIZ</h2>
            <div className="w-20 h-1 bg-[#0099ff] mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-400">
              Arena Bulls olarak birden fazla oyunda profesyonel e-spor takımlarımızla mücadele ediyoruz.
            </p>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {games.map((game) => (
                  <CarouselItem key={game.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <div className="game-card bg-black/50 rounded-lg overflow-hidden border border-gray-800 h-full">
                      <div className="relative h-64">
                        <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                      </div>
                      <div className="p-6">
                        <h3 className="hero-title text-2xl mb-3 line-clamp-1">{game.title}</h3>
                        <p className="text-gray-400 mb-4 line-clamp-3 h-[4.5rem] overflow-hidden">{game.description}</p>
                        <Link href={game.link}>
                          <Button className="w-full bg-[#0099ff] hover:bg-[#0099ff]/80">TAKIM DETAYLARI</Button>
                        </Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#0099ff]/80 hover:bg-[#0099ff] text-white border-none" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-[#0099ff]/80 hover:bg-[#0099ff] text-white border-none" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
