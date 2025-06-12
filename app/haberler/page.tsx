"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Filter } from "lucide-react"
import { getAllNews, getCategoryLabel, getCategoryColor, type NewsItem } from "@/lib/news"

export default function HaberlerPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "duyuru" | "sponsorluk" | "transfer" | "etkinlik" | "haber"
  >("all")
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        const news = await getAllNews()
        setAllNews(news)
      } catch (error) {
        console.error("Error loading news:", error)
        setAllNews([])
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  const filteredNews =
    selectedCategory === "all" ? allNews : allNews.filter((item) => item.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const categories = [
    { key: "all", label: "Tümü", count: allNews.length },
    { key: "duyuru", label: "Duyuru", count: allNews.filter((n) => n.category === "duyuru").length },
    { key: "sponsorluk", label: "Sponsorluk", count: allNews.filter((n) => n.category === "sponsorluk").length },
    { key: "transfer", label: "Transfer", count: allNews.filter((n) => n.category === "transfer").length },
    { key: "etkinlik", label: "Etkinlik", count: allNews.filter((n) => n.category === "etkinlik").length },
    { key: "haber", label: "Haber", count: allNews.filter((n) => n.category === "haber").length },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <section className="pt-32 pb-16 bg-gradient-to-b from-[#111111] to-black">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-block bg-[#0099ff]/10 px-6 py-3 rounded-full mb-6">
                <span className="text-[#0099ff] font-bold text-sm tracking-wider uppercase">Haberler & Duyurular</span>
              </div>
              <h1 className="hero-title text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-[#0099ff] to-white bg-clip-text text-transparent">
                GÜNCEL HABERLER
              </h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-1 w-12 bg-[#0099ff]/30 rounded-full"></div>
                <div className="h-1 w-24 bg-[#0099ff] rounded-full animate-pulse"></div>
                <div className="h-1 w-12 bg-[#0099ff]/30 rounded-full"></div>
              </div>
              <p className="max-w-2xl mx-auto text-gray-400 text-lg">Haberler yükleniyor...</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#111111] to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#0099ff] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#0099ff] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#0099ff] rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <div className="inline-block bg-[#0099ff]/10 px-6 py-3 rounded-full mb-6">
              <span className="text-[#0099ff] font-bold text-sm tracking-wider uppercase">Haberler & Duyurular</span>
            </div>
            <h1 className="hero-title text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-[#0099ff] to-white bg-clip-text text-transparent">
              GÜNCEL HABERLER
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-12 bg-[#0099ff]/30 rounded-full"></div>
              <div className="h-1 w-24 bg-[#0099ff] rounded-full"></div>
              <div className="h-1 w-12 bg-[#0099ff]/30 rounded-full"></div>
            </div>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Arena Bulls ile ilgili en güncel haberler, duyurular ve gelişmeleri buradan takip edebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-[#111111] sticky top-0 z-40 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="h-5 w-5 text-[#0099ff]" />
              <span className="text-white font-medium">Filtrele:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key as any)}
                  className={px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? "bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30"
                      : "bg-black/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700"
                  }}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <div className="w-24 h-24 bg-[#0099ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-12 w-12 text-[#0099ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Haber Bulunamadı</h3>
                <p className="text-gray-400 text-lg">Bu kategoride henüz haber bulunmuyor.</p>
              </div>
              <Button onClick={() => setSelectedCategory("all")} className="bg-[#0099ff] hover:bg-[#0099ff]/80">
                Tüm Haberleri Göster
              </Button>
            </div>
          ) : (
            <>
              {/* Featured News (First 3) */}
              {selectedCategory === "all" && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <span className="w-1 h-8 bg-[#0099ff] mr-3"></span>
                    Öne Çıkan Haberler
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {filteredNews.slice(0, 3).map((news) => (
                      <FeaturedNewsCard key={news.id} news={news} />
                    ))}
                  </div>
                </div>
              )}

              {/* All News Grid */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <span className="w-1 h-8 bg-[#0099ff] mr-3"></span>
                  {selectedCategory === "all" ? "Tüm Haberler" : getCategoryLabel(selectedCategory)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(selectedCategory === "all" ? filteredNews.slice(3) : filteredNews).map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
      </>
  )
}

// Featured News Card Component (Larger)
function FeaturedNewsCard({ news }: { news: NewsItem }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <>
    <article className="news-card bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-[#0099ff] transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0099ff]/10 group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={news.image || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge className={${getCategoryColor(news.category)} text-white font-medium px-3 py-1}>
            {getCategoryLabel(news.category)}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(news.date)}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {news.author}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 line-clamp-2 text-white group-hover:text-[#0099ff] transition-colors duration-300">
          {news.title}
        </h2>

        <p className="text-gray-400 mb-4 line-clamp-3">{news.excerpt}</p>

        <Link href={/haberler/${news.slug}}>
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
    </>
  )
}

// Regular News Card Component
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
    <>
    <article className="news-card bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-[#0099ff] transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#0099ff]/10 group h-full">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={news.image || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge className={${getCategoryColor(news.category)} text-white font-medium px-3 py-1 text-xs}>
            {getCategoryLabel(news.category)}
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4">
          <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {formatDate(news.date)}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {news.author}
          </div>
        </div>

        <h2 className="font-bold text-lg mb-3 line-clamp-2 text-white group-hover:text-[#0099ff] transition-colors duration-300 leading-tight">
          {news.title}
        </h2>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{news.excerpt}</p>

        <Link href={/haberler/${news.slug}} className="mt-auto">
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
    </>
  )
}
