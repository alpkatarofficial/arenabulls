"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"
import { getFeaturedBlogPosts, getBlogCategoryLabel, getBlogCategoryColor, type BlogPost } from "@/lib/blog"

export function BlogSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Fetch featured blogs
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await getFeaturedBlogPosts()
        setFeaturedBlogs(blogs)
      } catch (error) {
        console.error("Error fetching featured blogs:", error)
        setFeaturedBlogs([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const filteredBlogs =
    selectedCategory === "all" ? featuredBlogs : featuredBlogs.filter((blog) => blog.category === selectedCategory)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentSlide(0) // Reset to first slide when changing category
  }

  // Auto-play functionality
  useEffect(() => {
    const displayBlogs = filteredBlogs.slice(0, 3)
    if (!isAutoPlaying || displayBlogs.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayBlogs.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, filteredBlogs])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredBlogs.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredBlogs.length) % filteredBlogs.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500/10 px-6 py-3 rounded-full mb-6">
              <span className="text-purple-400 font-bold text-sm tracking-wider uppercase">Blog & Analiz</span>
            </div>
            <h2 className="hero-title text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white via-purple-400 to-white bg-clip-text text-transparent">
              DETAYLI ANALİZLER
            </h2>
          </div>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#141414] rounded-xl overflow-hidden border border-gray-800 animate-pulse">
                <div className="h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-700 rounded mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded mb-2 w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (featuredBlogs.length === 0) return null

  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-500/10 px-6 py-3 rounded-full mb-6">
            <span className="text-purple-400 font-bold text-sm tracking-wider uppercase">Blog & Analiz</span>
          </div>
          <h2 className="hero-title text-4xl md:text-5xl mb-6 bg-gradient-to-r from-white via-purple-400 to-white bg-clip-text text-transparent">
            DETAYLI ANALİZLER
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-12 bg-purple-500/30 rounded-full"></div>
            <div className="h-1 w-24 bg-purple-500 rounded-full"></div>
            <div className="h-1 w-12 bg-purple-500/30 rounded-full"></div>
          </div>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            E-spor dünyasından derinlemesine analizler, stratejiler ve uzman görüşleri.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Tümü
          </button>
          {["analiz", "strateji", "röportaj", "rehber", "teknoloji", "sektör"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {getBlogCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Desktop Slider */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="grid grid-cols-3 gap-6">
              {filteredBlogs.slice(0, 3).map((blog, index) => (
                <div
                  key={blog.id}
                  className={`blog-card transition-all duration-500 ${
                    index === currentSlide
                      ? "scale-105 z-10"
                      : index === (currentSlide + 1) % Math.min(filteredBlogs.length, 3) ||
                          index ===
                            (currentSlide - 1 + Math.min(filteredBlogs.length, 3)) % Math.min(filteredBlogs.length, 3)
                        ? "scale-100 opacity-80"
                        : "scale-95 opacity-60"
                  }`}
                >
                  <BlogCard blog={blog} />
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
              {filteredBlogs.map((blog) => (
                <div key={blog.id} className="w-full flex-shrink-0 px-2">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center items-center mt-8">
              <div className="flex space-x-3">
                {filteredBlogs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-purple-500 scale-150" : "bg-gray-600/50 hover:bg-gray-500"
                    }`}
                    aria-label={`${index + 1}. blog yazısına git`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation (Desktop) */}
        <div className="hidden lg:flex justify-center mt-12 space-x-4">
          {filteredBlogs.slice(0, 3).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-purple-500 scale-150 shadow-lg shadow-purple-500/50"
                  : "bg-gray-600/50 hover:bg-gray-500 hover:scale-125"
              }`}
              aria-label={`${index + 1}. blog yazısına git`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-transparent hover:bg-purple-500 border-2 border-purple-500 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
              TÜM BLOG YAZILARINI GÖR
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Blog Card Component
function BlogCard({ blog }: { blog: BlogPost }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <article className="blog-card bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 group h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getBlogCategoryColor(blog.category)} text-white font-medium px-3 py-1 text-xs`}>
            {getBlogCategoryLabel(blog.category)}
          </Badge>
        </div>

        {/* Date & Read Time */}
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

      {/* Content */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="font-bold text-lg mb-3 line-clamp-2 text-white group-hover:text-purple-400 transition-colors duration-300 leading-tight">
          {blog.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">{blog.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {blog.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
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
