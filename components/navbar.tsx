"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Arena Bulls" width={60} height={60} className="w-15 h-15" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/haberler" className="text-gray-300 hover:text-white transition-colors">
              Haberler
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/takimlar" className="text-gray-300 hover:text-white transition-colors">
              Takımlar
            </Link>
            <Link href="/iletisim" className="text-gray-300 hover:text-white transition-colors">
              İletişim
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            {/* <Button className="bg-[#0099ff] hover:bg-[#0099ff]/80 text-white">Bize Katıl</Button> */}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/haberler"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Haberler
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/takimlar"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Takımlar
              </Link>
              <Link
                href="/iletisim"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                İletişim
              </Link>
              {/* <Button className="bg-[#0099ff] hover:bg-[#0099ff]/80 text-white w-full">Bize Katıl</Button> */}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
