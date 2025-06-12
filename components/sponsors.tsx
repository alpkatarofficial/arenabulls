import Image from "next/image"

export function Sponsors() {
  const mainSponsors = [
    {
      name: "MSI",
      logo: "/images/sponsors/msi.png",
      link: "https://www.msi.com",
    },
    {
      name: "Arena Bilgisayar",
      logo: "/images/sponsors/arena-bilgisayar.png",
      link: "https://www.arena.com.tr",
    },
    {
      name: "HP OMEN",
      logo: "/images/sponsors/hp-omen.png",
      link: "https://www.omen.com",
    },
  ]

  const secondarySponsors = [
    {
      name: "BenQ",
      logo: "/images/sponsors/benq.png",
      link: "https://www.benq.com",
    },
    {
      name: "Razer",
      logo: "/images/sponsors/razer.svg",
      link: "https://www.razer.com",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements for visual interest */}
      <div className="absolute inset-0">
        {/* Brighter background elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#111111] via-[#001a33] to-[#111111] opacity-80"></div>
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#0099ff]/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#0099ff]/20 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
        {/* Light grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <span className="inline-block px-4 py-1 bg-[#0099ff]/10 rounded-full text-[#0099ff] text-sm font-medium mb-4">
            PARTNERS
          </span>
          <h2 className="hero-title text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#0099ff] to-white">
            SPONSORLARIMIZ
          </h2>
          <div className="w-16 h-1 bg-[#0099ff] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-400">Başarılarımızda yanımızda olan değerli sponsorlarımız.</p>
        </div>

        {/* Main Sponsors - Animated Carousel */}
        <div className="mb-16">
          <h3 className="text-center text-sm text-white font-medium uppercase mb-8">Ana Sponsorlar</h3>
          <div className="relative">
            <div className="flex items-center justify-center overflow-hidden">
              <div className="flex animate-marquee">
                {[...mainSponsors, ...mainSponsors].map((sponsor, index) => (
                  <a
                    key={index}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-32 w-64 mx-8 group"
                  >
                    <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative h-full w-full flex items-center justify-center p-6">
                      <Image
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        fill
                        className="object-contain filter group-hover:brightness-125 transition-all duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Sponsors - Animated Carousel */}
        <div>
          <h3 className="text-center text-sm text-white font-medium uppercase mb-8">Sponsorlar</h3>
          <div className="relative">
            <div className="flex items-center justify-center overflow-hidden">
              <div className="flex animate-marquee-reverse">
                {[...secondarySponsors, ...secondarySponsors, ...secondarySponsors].map((sponsor, index) => (
                  <a
                    key={index}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-28 w-56 mx-8 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0099ff]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"></div>
                    <div className="relative h-full w-full flex items-center justify-center p-6 rounded-lg">
                      <Image
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        fill
                        className="object-contain filter group-hover:brightness-125 transition-all duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
