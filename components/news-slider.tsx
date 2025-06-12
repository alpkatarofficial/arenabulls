"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { getAllNews, getCategoryLabel, getCategoryColor, type NewsItem } from "@/lib/news"

type CategoryFilter = "all" | "haber" | "duyuru" | "transfer" | "etkinlik" | "sponsorluk"

export function NewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all news on component mount
  useEffect(() => {
    async function loadAllNews() {
      try {
        const news = await getAllNews()
        setAllNews(news)
        setFilteredNews(news.slice(0, 6)) // Show first 6 news
      } catch (error) {
        console.error("Error loading news:", error)
        setAllNews([])
        setFilteredNews([])
      } finally {
        setIsLoading(false)
      }
    }

    loadAllNews()
  }, [])

  // Filter news by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredNews(allNews.slice(0, 6))
    } else {
      const filtered = allNews.filter((news) => news.category === selectedCategory).slice(0, 6)
      setFilteredNews(filtered)
    }
    setCurrentSlide(0) // Reset slide when category changes
  }, [selectedCategory, allNews])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || filteredNews.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(3, filteredNews.length))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, filteredNews.length])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(3, filteredNews.length))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.min(3, filteredNews.length)) % Math.min(3, filteredNews.length))
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const handleCategoryChange = (category: CategoryFilter) => {
    setSelectedCategory(category)
    setIsAutoPlaying(true) // Resume auto-play when category changes
  }

  const categories: { key: CategoryFilter; label: string; count: number }[] = [
    { key: "all", label: "Tümü", count: allNews.length },
    { key: "haber", label: "Haberler", count: allNews.filter((n) => n.category === "haber").length },
    { key: "transfer", label: "Transferler", count: allNews.filter((n) => n.category === "transfer").length },
    { key: "duyuru", label: "Duyurular", count: allNews.filter((n) => n.category === "duyuru").length },
    { key: "etkinlik", label: "Etkinlikler", count: allNews.filter((n) => n.category === "etkinlik").length },
    { key: "sponsorluk", label: "Sponsorluklar", count: allNews.filter((n) => n.category === "sponsorluk").length },
  ]

  if (isLoading) {
    return (
      <section className="py-20 bg-[#111111] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto mb-8"></div>
              <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 bg-gray-700 rounded w-24"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 bg-gray-700 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (filteredNews.length === 0) {
    return (
      <section className="py-20 bg-[#111111] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h2 className="hero-title text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white via-[#0099ff] to-white bg-clip-text text-transparent">
              GÜNCEL HABERLER
            </h2>
            <p className="text-gray-400 text-lg mb-8">Bu kategoride henüz haber bulunmuyor.</p>
            <Link href="/haberler">
              <Button className="bg-[#0099ff] hover:bg-[#0077cc] text-white">Tüm Haberleri Gör</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#111111] relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#0099ff]/10 px-6 py-3 rounded-full mb-6">
            <span className="text-[#0099ff] font-bold text-sm tracking-wider uppercase">Haberler & Duyurular</span>
          </div>
          <h2 className="hero-title text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white via-[#0099ff] to-white bg-clip-text text-transparent">
            GÜNCEL HABERLER
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-[#0099ff]/30 rounded-full"></div>
            <div className="h-1 w-24 bg-[#0099ff] rounded-full"></div>
            <div className="h-1 w-12 bg-[#0099ff]/30 rounded-full"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8">
            Arena Bulls takımı ile ilgili en güncel haberler, duyurular ve transfer haberleri.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {category.label}
                {category.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-black/30 rounded-full text-xs">{category.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Slider */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-3 gap-6">
              {filteredNews.slice(0, 3).map((news, index) => (
                <div
                  key={news.id}
                  className={`news-card transition-all duration-500 ${
                    index === currentSlide
                      ? "scale-105 z-10"
                      : index === (currentSlide + 1) % Math.min(3, filteredNews.length) ||
                          index ===
                            (currentSlide - 1 + Math.min(3, filteredNews.length)) % Math.min(3, filteredNews.length)
                        ? "scale-100 opacity-80"
                        : "scale-95 opacity-60"
                  }`}
                >
                  <NewsCard news={news} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredNews.map((news) => (
                <div key={news.id} className="w-full flex-shrink-0 px-2">
                  <NewsCard news={news} />
                </div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center items-center mt-8">
              <div className="flex space-x-3">
                {filteredNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-[#0099ff] scale-150" : "bg-gray-600/50 hover:bg-gray-500"
                    }`}
                    aria-label={`${index + 1}. habere git`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation (Desktop) */}
        {filteredNews.length > 3 && (
          <div className="hidden lg:flex justify-center mt-12 space-x-4">
            {filteredNews.slice(0, 3).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#0099ff] scale-150 shadow-lg shadow-[#0099ff]/50"
                    : "bg-gray-600/50 hover:bg-gray-500 hover:scale-125"
                }`}
                aria-label={`${index + 1}. habere git`}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/haberler">
            <Button className="bg-transparent hover:bg-[#0099ff] border-2 border-[#0099ff] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
              TÜM HABERLERİ GÖR
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// News Card Component
function NewsCard({ news }: { news: NewsItem }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <article className="news-card bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-[#0099ff] transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0099ff]/10 group h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={news.image || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getCategoryColor(news.category)} text-white font-medium px-3 py-1 text-xs`}>
            {getCategoryLabel(news.category)}
          </Badge>
        </div>

        {/* Date */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {formatDate(news.date)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="font-bold text-lg mb-3 line-clamp-2 text-white group-hover:text-[#0099ff] transition-colors duration-300 leading-tight">
          {news.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">{news.excerpt}</p>

        {/* CTA Button */}
        <Link href={`/haberler/${news.slug}`} className="mt-auto">
          <Button
            variant="outline"
            className="w-full border-[#0099ff] text-[#0099ff] hover:bg-[#0099ff] hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#0099ff]/20"
          >
            Devamını Oku
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </article>
  )
}
