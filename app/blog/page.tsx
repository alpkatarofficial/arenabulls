"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Filter, Clock } from "lucide-react"
import { getAllBlogPosts, getBlogCategoryLabel, getBlogCategoryColor } from "@/lib/blog"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "analiz" | "strateji" | "röportaj" | "rehber" | "teknoloji" | "sektör"
  >("all")
  const [allBlogs, setAllBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Load blogs
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true)
        const blogs = await getAllBlogPosts()
        setAllBlogs(blogs || [])
      } catch (error) {
        console.error("Error loading blogs:", error)
        setAllBlogs([])
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  // Scroll to results when category changes
  useEffect(() => {
    if (!loading && selectedCategory !== "all") {
      const resultsSection = document.getElementById("filtered-results")
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [selectedCategory, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <section className="pt-32 pb-16 bg-gradient-to-b from-[#0a0a0a] to-black">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
                <div className="h-16 bg-gray-700 rounded w-96 mx-auto mb-6"></div>
                <div className="h-4 bg-gray-700 rounded w-80 mx-auto"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800 rounded-xl h-64 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const filteredBlogs =
    selectedCategory === "all" ? allBlogs : allBlogs.filter((item) => item.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const categories = [
    { key: "all", label: "Tümü", count: allBlogs.length },
    { key: "analiz", label: "Analiz", count: allBlogs.filter((b) => b.category === "analiz").length },
    { key: "strateji", label: "Strateji", count: allBlogs.filter((b) => b.category === "strateji").length },
    { key: "röportaj", label: "Röportaj", count: allBlogs.filter((b) => b.category === "röportaj").length },
    { key: "rehber", label: "Rehber", count: allBlogs.filter((b) => b.category === "rehber").length },
    { key: "teknoloji", label: "Teknoloji", count: allBlogs.filter((b) => b.category === "teknoloji").length },
    { key: "sektör", label: "Sektör", count: allBlogs.filter((b) => b.category === "sektör").length },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-purple-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <div className="inline-block bg-purple-500/10 px-6 py-3 rounded-full mb-6">
              <span className="text-purple-400 font-bold text-sm tracking-wider uppercase">Blog & Analiz</span>
            </div>
            <h1 className="hero-title text-4xl md:text-6xl mb-6 bg-gradient-to-r from-white via-purple-400 to-white bg-clip-text text-transparent">
              DETAYLI ANALİZLER
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-12 bg-purple-500/30 rounded-full"></div>
              <div className="h-1 w-24 bg-purple-500 rounded-full"></div>
              <div className="h-1 w-12 bg-purple-500/30 rounded-full"></div>
            </div>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              E-spor dünyasından derinlemesine analizler, stratejiler ve uzman görüşleri.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-[#0a0a0a] sticky top-0 z-40 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 mb-3 md:mb-0 md:mr-4">
              <Filter className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">Kategoriye Göre Filtrele:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key as any)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30 transform scale-105"
                      : "bg-black/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-black">
        <div id="filtered-results" className="container mx-auto px-4">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-12 w-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Blog Yazısı Bulunamadı</h3>
                <p className="text-gray-400 text-lg">Bu kategoride henüz blog yazısı bulunmuyor.</p>
              </div>
              <Button onClick={() => setSelectedCategory("all")} className="bg-purple-500 hover:bg-purple-500/80">
                Tüm Blog Yazılarını Göster
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Blogs (First 3) */}
              {selectedCategory === "all" && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <span className="w-1 h-8 bg-purple-500 mr-3"></span>
                    Öne Çıkan Blog Yazıları
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {filteredBlogs.slice(0, 3).map((blog) => (
                      <FeaturedBlogCard key={blog.id} blog={blog} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Blogs Grid */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <span className="w-1 h-8 bg-purple-500 mr-3"></span>
                  {selectedCategory === "all" ? "Tüm Blog Yazıları" : getBlogCategoryLabel(selectedCategory)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(selectedCategory === "all" ? filteredBlogs.slice(3) : filteredBlogs).map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Featured Blog Card Component (Larger)
function FeaturedBlogCard({ blog }: { blog: any }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <article className="blog-card bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge className={`${getBlogCategoryColor(blog.category)} text-white font-medium px-3 py-1`}>
            {getBlogCategoryLabel(blog.category)}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(blog.date)}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {blog.author}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {blog.readTime} dk
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 line-clamp-2 text-white group-hover:text-purple-400 transition-colors duration-300">
          {blog.title}
        </h2>

        <p className="text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {blog.tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <Button
            variant="outline"
            className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20"
          >
            Devamını Oku
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </article>
  )
}

// Regular Blog Card Component
function BlogCard({ blog }: { blog: any }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <article className="blog-card bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 group h-full">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge className={`${getBlogCategoryColor(blog.category)} text-white font-medium px-3 py-1 text-xs`}>
            {getBlogCategoryLabel(blog.category)}
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
          <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {formatDate(blog.date)}
          </span>
          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            <Clock className="h-3 w-3" />
            {blog.readTime} dk
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {blog.author}
          </div>
        </div>

        <h2 className="font-bold text-lg mb-3 line-clamp-2 text-white group-hover:text-purple-400 transition-colors duration-300 leading-tight">
          {blog.title}
        </h2>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{blog.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {blog.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <Link href={`/blog/${blog.slug}`} className="mt-auto">
          <Button
            variant="outline"
            className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20"
          >
            Devamını Oku
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </article>
  )
}
