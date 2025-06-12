import Link from "next/link"
import { Instagram, Twitter, Youtube, Twitch, Facebook } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image src="/images/logo.png" alt="Arena Bulls Logo" width={80} height={80} className="h-20 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Arena Bulls, Türkiye'nin önde gelen e-spor organizasyonlarından biridir. Valorant, League of Legends, CS2
              ve FC 25 oyunlarında profesyonel takımlarımızla mücadele ediyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0099ff]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0099ff]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0099ff]">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0099ff]">
                <Twitch className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0099ff]">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">HIZLI ERİŞİM</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/takim" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  Takım
                </Link>
              </li>
              <li>
                <Link href="/mac-takvimi" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  Maç Takvimi
                </Link>
              </li>
              <li>
                <Link href="/haberler" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  Haberler
                </Link>
              </li>
              <li>
                <Link href="/magaza" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  Mağaza
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">OYUNLAR</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/takim/valorant" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  Valorant
                </Link>
              </li>
              <li>
                <Link href="/takim/lol" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  League of Legends
                </Link>
              </li>
              <li>
                <Link href="/takim/fifa" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  FC 25
                </Link>
              </li>
              <li>
                <Link href="/takim/cs2" className="text-gray-400 hover:text-[#0099ff] text-sm">
                  CS2
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">İLETİŞİM</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">info@arenabulls.gg</li>
              <li className="text-gray-400 text-sm">İstanbul, Türkiye</li>
              <li>
                <Link href="/iletisim" className="text-[#0099ff] hover:underline text-sm">
                  İletişim Formu
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Arena Bulls. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link href="/gizlilik-politikasi" className="text-gray-500 hover:text-[#0099ff] text-sm">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="text-gray-500 hover:text-[#0099ff] text-sm">
                Kullanım Şartları
              </Link>
              <Link href="/cerezler" className="text-gray-500 hover:text-[#0099ff] text-sm">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
