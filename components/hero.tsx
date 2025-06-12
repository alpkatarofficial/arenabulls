import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <Image
          src="/images/arenabulls.jpeg"
          alt="Arena Bulls Hero"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
          quality={85}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 -mt-16">
        <div className="mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%20copy%204-9s9fbugvx3ukh5vYTldfIBRylyZWsI.png"
            alt="ARENA BULLS Logo"
            width={800}
            height={200}
            className="max-w-full h-auto"
            priority
            sizes="(max-width: 768px) 90vw, 800px"
            quality={90}
          />
        </div>
        <h1 className="hero-title text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#0099ff] to-white bg-clip-text text-transparent">
          TÜRKİYE'NİN ARENASINDA YERİNİ AL
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          Valorant, League of Legends, CS2 ve FC25 sahnesinde yükselen yerli e-spor takımı Arena Bulls, rekabetin tam
          merkezinde.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-[#0099ff] hover:bg-[#0099ff]/80 text-white px-8 py-6 text-lg">MAĞAZAMIZI GÖR</Button>
        </div>
      </div>
    </div>
  )
}
