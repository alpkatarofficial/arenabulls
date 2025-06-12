"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Save,
  Upload,
  Eye,
  Newspaper,
  BookOpen,
  Loader2,
  Trophy,
  Home,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  Clock,
  Sparkles,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { DatabaseService } from "@/lib/database"
import { BlogImportTool } from "@/components/blog-import-tool"

// Debug function to log localStorage content
const debugLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const newsData = localStorage.getItem("arenabulls_news")
      const blogData = localStorage.getItem("arenabulls_blog")
      console.log("📊 Current localStorage news count:", newsData ? JSON.parse(newsData).length : 0)
      console.log("📊 Current localStorage blog count:", blogData ? JSON.parse(blogData).length : 0)
    } catch (error) {
      console.error("Error debugging localStorage:", error)
    }
  }
}

// Mock functions for matches (replace with actual implementation later)
const getAllMatches = () => {
  // Replace with actual data fetching from database or API
  return [
    {
      id: "1",
      game: "VALORANT",
      tournament: "VCT Masters Madrid",
      date: "2024-03-14",
      time: "17:00",
      teamA: { name: "Arena Bulls", logo: "/images/logo.png", score: 13 },
      teamB: { name: "KOI", logo: "/images/koi-logo.png", score: 8 },
      status: "completed",
      result: "win",
    },
    {
      id: "2",
      game: "LEAGUE OF LEGENDS",
      tournament: "LEC Winter Split",
      date: "2024-02-28",
      time: "20:00",
      teamA: { name: "Arena Bulls", logo: "/images/logo.png", score: 1 },
      teamB: { name: "G2 Esports", logo: "/images/g2-logo.png", score: 0 },
      status: "completed",
      result: "loss",
    },
    {
      id: "3",
      game: "VALORANT",
      tournament: "VCT EMEA League",
      date: "2024-04-05",
      time: "18:30",
      teamA: { name: "Arena Bulls", logo: "/images/logo.png", score: null },
      teamB: { name: "Fnatic", logo: "/images/fnatic-logo.png", score: null },
      status: "upcoming",
      result: null,
    },
  ]
}

const createMatch = (match: any) => {
  // Replace with actual database insertion or API call
  console.log("Creating match:", match)
  alert("Maç oluşturuldu (mock function)")
}

const deleteMatch = (id: string) => {
  // Replace with actual database deletion or API call
  console.log("Deleting match with ID:", id)
  alert("Maç silindi (mock function)")
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [contentType, setContentType] = useState<"news" | "blog" | "match">("news")
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "haber",
    featured: false,
    author: "Arena Bulls Medya",
    image: "",
    tags: "",
    // Match specific fields
    game: "VALORANT",
    tournament: "",
    date: "",
    time: "",
    teamAName: "Arena Bulls",
    teamALogo: "/images/logo.png",
    teamAScore: "",
    teamBName: "",
    teamBLogo: "",
    teamBScore: "",
    status: "upcoming",
    result: "",
  })

  const [isDraft, setIsDraft] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [originalFormData, setOriginalFormData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [allNews, setAllNews] = useState<any[]>([])
  const [allBlogs, setAllBlogs] = useState<any[]>([])
  const [allMatches, setAllMatches] = useState(getAllMatches())

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
    } else {
      router.push("/admin")
    }
  }, [router])

  const refreshData = async () => {
    debugLocalStorage() // Add this line
    setAllNews(await DatabaseService.getAllNews())
    setAllBlogs(await DatabaseService.getAllBlogs())
    setAllMatches(getAllMatches())
    debugLocalStorage() // Add this line
  }

  useEffect(() => {
    const loadData = async () => {
      if (isLoggedIn) {
        setAllNews(await DatabaseService.getAllNews())
        setAllBlogs(await DatabaseService.getAllBlogs())
      }
    }
    loadData()
  }, [isLoggedIn])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field = "image") => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Use the upload API endpoint
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()
      console.log("✅ Image uploaded successfully:", url)

      setFormData((prev) => ({
        ...prev,
        [field]: url,
      }))
    } catch (error) {
      console.error("Upload error:", error)
      alert("Resim yüklenirken hata oluştu!")
    } finally {
      setIsUploading(false)
    }
  }

  const autoSave = async () => {
    if (!formData.title && !formData.content) return

    setIsAutoSaving(true)
    try {
      const draftKey = `draft_${contentType}_${isEditing ? originalFormData?.id : "new"}`
      localStorage.setItem(
        draftKey,
        JSON.stringify({
          ...formData,
          lastSaved: new Date().toISOString(),
          contentType,
        }),
      )
      setLastSaved(new Date())
      setIsDraft(true)
    } catch (error) {
      console.error("Auto-save error:", error)
    } finally {
      setIsAutoSaving(false)
    }
  }

  // Load draft function
  const loadDraft = (type: "news" | "blog" | "match") => {
    const draftKey = `draft_${type}_${isEditing ? originalFormData?.id : "new"}`
    const draft = localStorage.getItem(draftKey)
    if (draft) {
      const draftData = JSON.parse(draft)
      setFormData(draftData)
      setLastSaved(new Date(draftData.lastSaved))
      setIsDraft(true)
    }
  }

  // Clear draft function
  const clearDraft = () => {
    const draftKey = `draft_${contentType}_${isEditing ? originalFormData?.id : "new"}`
    localStorage.removeItem(draftKey)
    setIsDraft(false)
    setLastSaved(null)
  }

  // Reset to original function
  const resetToOriginal = () => {
    if (originalFormData) {
      setFormData(originalFormData)
      clearDraft()
    } else {
      // Reset to empty form
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "haber",
        featured: false,
        author: "Arena Bulls Medya",
        image: "",
        tags: "",
        game: "VALORANT",
        tournament: "",
        date: "",
        time: "",
        teamAName: "Arena Bulls",
        teamALogo: "/images/logo.png",
        teamAScore: "",
        teamBName: "",
        teamBLogo: "",
        teamBScore: "",
        status: "upcoming",
        result: "",
      })
      clearDraft()
    }
  }

  const generateSlug = (title: string) => {
    // First, create a clean version of the title
    const cleanTitle = title
      .toLowerCase()
      .trim()
      // Turkish character replacements
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/Ğ/g, "g")
      .replace(/Ü/g, "u")
      .replace(/Ş/g, "s")
      .replace(/İ/g, "i")
      .replace(/Ö/g, "o")
      .replace(/Ç/g, "c")
      // Remove special characters except spaces and hyphens
      .replace(/[^a-z0-9\s-]/g, "")
      // Replace multiple spaces with single space
      .replace(/\s+/g, " ")
      // Replace spaces with hyphens
      .replace(/\s/g, "-")
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")

    // Add a timestamp to ensure uniqueness
    const timestamp = new Date().getTime().toString().slice(-4)
    return `${cleanTitle}-${timestamp}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validation
      if (!formData.title.trim()) {
        alert("Başlık gereklidir!")
        setIsSubmitting(false)
        return
      }

      if (!formData.content.trim()) {
        alert("İçerik gereklidir!")
        setIsSubmitting(false)
        return
      }

      if (!formData.excerpt.trim()) {
        alert("Özet gereklidir!")
        setIsSubmitting(false)
        return
      }

      const slug = generateSlug(formData.title)
      console.log("🔗 Generated slug:", slug)

      if (contentType === "match") {
        const newMatch = {
          game: formData.game as any,
          tournament: formData.tournament,
          date: formData.date,
          time: formData.time,
          teamA: {
            name: formData.teamAName,
            logo: formData.teamALogo,
            score: formData.teamAScore ? Number(formData.teamAScore) : null,
          },
          teamB: {
            name: formData.teamBName,
            logo: formData.teamBLogo,
            score: formData.teamBScore ? Number(formData.teamBScore) : null,
          },
          status: formData.status as any,
          result: formData.result ? (formData.result as any) : null,
        }

        createMatch(newMatch)
        alert("Maç başarıyla eklendi!")
      } else if (contentType === "news") {
        // News için slug oluşturma ve kaydetme
        const slug = generateSlug(formData.title)
        console.log("🔗 Generated slug for news:", slug)

        const newNews = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          excerpt: formData.excerpt.trim(),
          category: formData.category as any,
          featured: formData.featured,
          author: formData.author.trim(),
          image: formData.image || "/placeholder.svg?height=400&width=600&text=News+Image",
          slug: slug,
          date: formData.date || new Date().toISOString().split("T")[0],
        }

        console.log("📰 Creating news with data:", newNews)
        try {
          const createdNews = await DatabaseService.createNews(newNews)
          console.log("✅ News created successfully with ID:", createdNews.id)
          alert(`Haber başarıyla eklendi! Slug: ${slug}`)

          // Force refresh the news data
          DatabaseService.forceRefreshNews()
        } catch (error) {
          console.error("❌ Error creating news:", error)
          alert("Haber eklenirken bir hata oluştu!")
          throw error
        }
      } else if (contentType === "blog") {
        // Blog için slug oluşturma ve kaydetme
        const slug = generateSlug(formData.title)
        console.log("🔗 Generated slug for blog:", slug)

        const newBlog = {
          title: formData.title.trim(),
          content: formData.content.trim(),
          excerpt: formData.excerpt.trim(),
          category: formData.category as any,
          featured: formData.featured,
          author: formData.author.trim(),
          image: formData.image || "/placeholder.svg?height=400&width=600&text=Blog+Image",
          slug: slug,
          date: formData.date || new Date().toISOString().split("T")[0],
          readTime: Math.ceil(formData.content.length / 1000) * 2,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
        }

        console.log("📝 Creating blog with data:", newBlog)
        try {
          const createdBlog = await DatabaseService.createBlog(newBlog)
          console.log("✅ Blog created successfully with ID:", createdBlog.id)
          alert(`Blog başarıyla eklendi! Slug: ${slug}`)

          // Force refresh the blog data
          DatabaseService.forceRefreshBlogs()
        } catch (error) {
          console.error("❌ Error creating blog:", error)
          alert("Blog eklenirken bir hata oluştu!")
          throw error
        }
      }

      clearDraft()
      setIsEditing(false)
      setOriginalFormData(null)

      // Reset form
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "haber",
        featured: false,
        author: "Arena Bulls Medya",
        image: "",
        tags: "",
        game: "VALORANT",
        tournament: "",
        date: "",
        time: "",
        teamAName: "Arena Bulls",
        teamALogo: "/images/logo.png",
        teamAScore: "",
        teamBName: "",
        teamBLogo: "",
        teamBScore: "",
        status: "upcoming",
        result: "",
      })

      await refreshData()
    } catch (error) {
      console.error("Submit error:", error)
      alert("Kaydetme sırasında hata oluştu!")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-save effect
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave()
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(interval)
  }, [formData, contentType, isEditing, originalFormData])

  // Load draft on content type change
  useEffect(() => {
    if (!isEditing) {
      loadDraft(contentType)
    }
  }, [contentType, isEditing])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDelete = async (id: string, type: "news" | "blog" | "match") => {
    if (confirm("Silmek istediğine emin misin?")) {
      try {
        if (type === "news") {
          await DatabaseService.deleteNews(id)
        } else if (type === "blog") {
          await DatabaseService.deleteBlog(id)
        } else if (type === "match") {
          deleteMatch(id)
        }
        alert("Başarıyla silindi!")
        refreshData()
      } catch (error) {
        console.error("Silme hatası:", error)
        alert("Silme sırasında hata oluştu!")
      }
    }
  }

  const handleEdit = (item: any, type: "news" | "blog" | "match") => {
    setIsEditing(true)
    setOriginalFormData(item)

    // Fill the form with the item data for editing
    if (type === "news" || type === "blog") {
      const editData = {
        ...formData,
        title: item.title,
        content: item.content,
        excerpt: item.excerpt,
        category: item.category,
        featured: item.featured,
        author: item.author,
        image: item.image,
        tags: type === "blog" ? item.tags.join(", ") : "",
        date: item.date,
      }
      setFormData(editData)
      setOriginalFormData(editData)
    } else if (type === "match") {
      const editData = {
        ...formData,
        game: item.game,
        tournament: item.tournament,
        date: item.date,
        time: item.time,
        teamAName: item.teamA.name,
        teamALogo: item.teamA.logo,
        teamAScore: item.teamA.score?.toString() || "",
        teamBName: item.teamB.name,
        teamBLogo: item.teamB.logo,
        teamBScore: item.teamB.score?.toString() || "",
        status: item.status,
        result: item.result || "",
      }
      setFormData(editData)
      setOriginalFormData(editData)
    }

    setContentType(type)
    setActiveTab("new")
  }

  const handlePreview = (item: any, type: "news" | "blog" | "match") => {
    if (type === "news") {
      // Open news preview in new tab
      window.open(`/haberler/${item.slug}`, "_blank")
    } else if (type === "blog") {
      // Open blog preview in new tab
      window.open(`/blog/${item.slug}`, "_blank")
    } else {
      // TODO: Implement match preview functionality
      console.log(`Maç önizleme isteği:`, item, type)
      alert("Maç önizleme özelliği henüz aktif değil!")
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          <span className="text-xl font-semibold">Yükleniyor...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Modern Header */}
      <div className="border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="container mx-auto px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-all duration-500 group"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-500 border border-white/10">
                  <Home className="h-6 w-6 group-hover:text-cyan-400 transition-colors duration-500" />
                </div>
                <span className="font-semibold text-lg">Ana Sayfa</span>
              </Link>
              <div className="text-white/30 text-2xl">/</div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  İçerik Yönetimi
                </h1>
                <p className="text-gray-300 mt-2 text-lg">Haberler, bloglar, maçlar ve duyuruları yönetin</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-400/50 text-red-300 hover:bg-red-500/20 hover:text-red-200 hover:border-red-300 transition-all duration-500 px-6 py-3"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Çıkış
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
          {/* Ultra Modern Tab Navigation */}
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-5 bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-3 shadow-2xl">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-500 px-6 py-3"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-500 px-6 py-3"
              >
                <Newspaper className="h-5 w-5 mr-2" />
                Haberler
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-500 px-6 py-3"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Blog
              </TabsTrigger>
              <TabsTrigger
                value="matches"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-500 px-6 py-3"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Maçlar
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-500 px-6 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                Yeni Ekle
              </TabsTrigger>
              <TabsTrigger
                value="import"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-500 px-6 py-3"
              >
                <Upload className="h-5 w-5 mr-2" />
                İçe Aktar
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            {/* Ultra Modern Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border-cyan-400/30 backdrop-blur-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-cyan-300">Toplam Haber</CardTitle>
                    <div className="p-3 bg-cyan-500/30 rounded-2xl">
                      <Newspaper className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white mb-3">{allNews.length}</div>
                  <div className="flex items-center text-sm text-green-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% bu ay
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/10 border-purple-400/30 backdrop-blur-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-purple-300">Toplam Blog</CardTitle>
                    <div className="p-3 bg-purple-500/30 rounded-2xl">
                      <BookOpen className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white mb-3">{allBlogs.length}</div>
                  <div className="flex items-center text-sm text-green-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8% bu ay
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border-green-400/30 backdrop-blur-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-green-300">Toplam Maç</CardTitle>
                    <div className="p-3 bg-green-500/30 rounded-2xl">
                      <Trophy className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white mb-3">{allMatches.length}</div>
                  <div className="flex items-center text-sm text-green-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +5% bu ay
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/10 border-orange-400/30 backdrop-blur-2xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-orange-300">Yaklaşan Maç</CardTitle>
                    <div className="p-3 bg-orange-500/30 rounded-2xl">
                      <Calendar className="h-6 w-6 text-orange-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white mb-3">
                    {allMatches.filter((m) => m.status === "upcoming").length}
                  </div>
                  <div className="flex items-center text-sm text-orange-400">
                    <Clock className="h-4 w-4 mr-1" />
                    Bu hafta
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ultra Modern Recent Activity */}
            <Card className="bg-black/40 border-white/20 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl">
                    <Activity className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Son Aktiviteler</CardTitle>
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[...allNews, ...allBlogs, ...allMatches]
                    .sort(
                      (a, b) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime(),
                    )
                    .slice(0, 5)
                    .map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`p-3 rounded-2xl ${
                              "readTime" in item
                                ? "bg-purple-500/30"
                                : "game" in item
                                  ? "bg-green-500/30"
                                  : "bg-blue-500/30"
                            }`}
                          >
                            {"readTime" in item ? (
                              <BookOpen className="h-5 w-5 text-purple-400" />
                            ) : "game" in item ? (
                              <Trophy className="h-5 w-5 text-green-400" />
                            ) : (
                              <Newspaper className="h-5 w-5 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-lg">
                              {"game" in item ? `${item.teamA.name} vs ${item.teamB.name}` : item.title}
                            </h4>
                            <p className="text-gray-300 mt-1">
                              {formatDate(item.date || item.createdAt.toISOString().split("T")[0])}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`px-4 py-2 text-sm font-semibold ${
                            "readTime" in item
                              ? "border-purple-400/50 text-purple-300 bg-purple-500/10"
                              : "game" in item
                                ? "border-green-400/50 text-green-300 bg-green-500/10"
                                : "border-blue-400/50 text-blue-300 bg-blue-500/10"
                          }`}
                        >
                          {"readTime" in item ? "Blog" : "game" in item ? "Maç" : "Haber"}
                        </Badge>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white hover:bg-white/10"
                            onClick={() =>
                              handlePreview(item, "readTime" in item ? "blog" : "game" in item ? "match" : "news")
                            }
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-white hover:bg-blue-500/20"
                            onClick={() =>
                              handleEdit(item, "readTime" in item ? "blog" : "game" in item ? "match" : "news")
                            }
                          >
                            <Edit className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-white hover:bg-red-500/20"
                            onClick={() =>
                              handleDelete(item.id, "readTime" in item ? "blog" : "game" in item ? "match" : "news")
                            }
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-8">
            <Card className="bg-black/40 border-white/20 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/30 rounded-2xl">
                    <Newspaper className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Haberler ve Duyurular</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allNews.map((news) => (
                    <div
                      key={news.id}
                      className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="font-semibold text-white text-lg">{news.title}</h3>
                          <Badge
                            className={
                              news.category === "haber"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/50"
                                : "bg-green-500/20 text-green-300 border-green-500/50"
                            }
                          >
                            {news.category === "haber" ? "HABER" : news.category.toUpperCase()}
                          </Badge>
                          {news.featured && (
                            <Badge className="border-yellow-500/50 text-yellow-300 bg-yellow-500/10">ÖNE ÇIKAN</Badge>
                          )}
                        </div>
                        <p className="text-gray-300 mb-3">{news.excerpt}</p>
                        <div className="text-sm text-gray-400">
                          {formatDate(news.date)} • {news.author}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10"
                          onClick={() => handlePreview(news, "news")}
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-white hover:bg-blue-500/20"
                          onClick={() => handleEdit(news, "news")}
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-white hover:bg-red-500/20"
                          onClick={() => handleDelete(news.id, "news")}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-8">
            <Card className="bg-black/40 border-white/20 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/30 rounded-2xl">
                    <BookOpen className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Blog Yazıları</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="font-semibold text-white text-lg">{blog.title}</h3>
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                            {blog.category.toUpperCase()}
                          </Badge>
                          {blog.featured && (
                            <Badge className="border-yellow-500/50 text-yellow-300 bg-yellow-500/10">ÖNE ÇIKAN</Badge>
                          )}
                        </div>
                        <p className="text-gray-300 mb-3">{blog.excerpt}</p>
                        <div className="text-sm text-gray-400 flex items-center gap-6">
                          <span>
                            {formatDate(blog.date)} • {blog.author}
                          </span>
                          <span>{blog.readTime} dk okuma</span>
                          <div className="flex gap-2">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-purple-400">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10"
                          onClick={() => handlePreview(blog, "blog")}
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-400 hover:text-white hover:bg-purple-500/20"
                          onClick={() => handleEdit(blog, "blog")}
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-white hover:bg-red-500/20"
                          onClick={() => handleDelete(blog.id, "blog")}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-8">
            <Card className="bg-black/40 border-white/20 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/30 rounded-2xl">
                    <Trophy className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Maç Takvimi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="font-semibold text-white text-lg">
                            {match.teamA.name} vs {match.teamB.name}
                          </h3>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">{match.game}</Badge>
                          <Badge
                            className={
                              match.status === "upcoming"
                                ? "border-yellow-500/50 text-yellow-300 bg-yellow-500/10"
                                : match.status === "completed"
                                  ? "border-green-500/50 text-green-300 bg-green-500/10"
                                  : "border-red-500/50 text-red-300 bg-red-500/10"
                            }
                          >
                            {match.status === "upcoming"
                              ? "YAKLAŞAN"
                              : match.status === "completed"
                                ? "TAMAMLANAN"
                                : "CANLI"}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3">{match.tournament}</p>
                        <div className="text-sm text-gray-400 flex items-center gap-6">
                          <span>
                            {formatDate(match.date)} • {match.time}
                          </span>
                          {match.status === "completed" && (
                            <span>
                              Skor: {match.teamA.score} - {match.teamB.score}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-white/10"
                          onClick={() => handlePreview(match, "match")}
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-400 hover:text-white hover:bg-green-500/20"
                          onClick={() => handleEdit(match, "match")}
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-white hover:bg-red-500/20"
                          onClick={() => handleDelete(match.id, "match")}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Content Tab */}
          <TabsContent value="new" className="space-y-8">
            <Card className="bg-black/40 border-white/20 backdrop-blur-2xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/30 rounded-2xl">
                      <Plus className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white font-bold">
                        {isEditing ? "İçerik Düzenle" : "Yeni İçerik Ekle"}
                      </CardTitle>
                      {isDraft && lastSaved && (
                        <p className="text-sm text-yellow-400 mt-1">
                          Taslak kaydedildi: {lastSaved.toLocaleTimeString("tr-TR")}
                        </p>
                      )}
                      {isAutoSaving && (
                        <p className="text-sm text-blue-400 mt-1">
                          <Loader2 className="h-3 w-3 inline mr-1 animate-spin" />
                          Otomatik kaydediliyor...
                        </p>
                      )}
                    </div>
                  </div>

                  {(isEditing || isDraft) && (
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetToOriginal}
                        className="border-yellow-400/50 text-yellow-300 hover:bg-yellow-500/20"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {isEditing ? "Değişiklikleri Geri Al" : "Taslağı Temizle"}
                      </Button>
                      {isDraft && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={clearDraft}
                          className="border-red-400/50 text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Taslağı Sil
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Content Type Selection */}
                  <div className="flex gap-6">
                    <Button
                      type="button"
                      variant={contentType === "news" ? "default" : "outline"}
                      onClick={() => setContentType("news")}
                      className={
                        contentType === "news"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4"
                          : "border-white/20 hover:bg-white/10 px-8 py-4"
                      }
                    >
                      <Newspaper className="h-5 w-5 mr-2" />
                      Haber/Duyuru
                    </Button>
                    <Button
                      type="button"
                      variant={contentType === "blog" ? "default" : "outline"}
                      onClick={() => setContentType("blog")}
                      className={
                        contentType === "blog"
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-8 py-4"
                          : "border-white/20 hover:bg-white/10 px-8 py-4"
                      }
                    >
                      <BookOpen className="h-5 w-5 mr-2" />
                      Blog Yazısı
                    </Button>
                    <Button
                      type="button"
                      variant={contentType === "match" ? "default" : "outline"}
                      onClick={() => setContentType("match")}
                      className={
                        contentType === "match"
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4"
                          : "border-white/20 hover:bg-white/10 px-8 py-4"
                      }
                    >
                      <Trophy className="h-5 w-5 mr-2" />
                      Maç
                    </Button>
                  </div>

                  {contentType === "news" && (
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="title" className="text-gray-300">
                          Başlık *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Haber başlığını girin"
                          className="bg-black/50 border-gray-700 text-white"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="excerpt" className="text-gray-300">
                          Özet *
                        </Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange("excerpt", e.target.value)}
                          placeholder="Haberin kısa özetini girin"
                          className="bg-black/50 border-gray-700 text-white"
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300">Kategori</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="haber" className="text-white">
                              Haber
                            </SelectItem>
                            <SelectItem value="duyuru" className="text-white">
                              Duyuru
                            </SelectItem>
                            <SelectItem value="transfer" className="text-white">
                              Transfer
                            </SelectItem>
                            <SelectItem value="etkinlik" className="text-white">
                              Etkinlik
                            </SelectItem>
                            <SelectItem value="sponsorluk" className="text-white">
                              Sponsorluk
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="author" className="text-gray-300">
                          Yazar
                        </Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          className="bg-black/50 border-gray-700 text-white"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => handleInputChange("featured", checked)}
                        />
                        <Label htmlFor="featured" className="text-gray-300">
                          Öne Çıkan Haber
                        </Label>
                      </div>

                      <div>
                        <Label htmlFor="image" className="text-gray-300">
                          Kapak Resmi
                        </Label>
                        <div className="mt-2">
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="hidden"
                            disabled={isUploading}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("image")?.click()}
                            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Yükleniyor...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Resim Seç
                              </>
                            )}
                          </Button>
                        </div>
                        {formData.image && (
                          <div className="mt-4">
                            <img
                              src={formData.image || "/placeholder.svg"}
                              alt="Önizleme"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="content" className="text-gray-300">
                          İçerik *
                        </Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => handleInputChange("content", e.target.value)}
                          placeholder="Haber içeriğini girin"
                          className="bg-black/50 border-gray-700 text-white min-h-[300px]"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {contentType === "blog" && (
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="title" className="text-gray-300">
                          Başlık *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Blog başlığını girin"
                          className="bg-black/50 border-gray-700 text-white"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="excerpt" className="text-gray-300">
                          Özet *
                        </Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange("excerpt", e.target.value)}
                          placeholder="Blog yazısının kısa özetini girin"
                          className="bg-black/50 border-gray-700 text-white"
                          rows={3}
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300">Kategori</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="analiz" className="text-white">
                              Analiz
                            </SelectItem>
                            <SelectItem value="strateji" className="text-white">
                              Strateji
                            </SelectItem>
                            <SelectItem value="röportaj" className="text-white">
                              Röportaj
                            </SelectItem>
                            <SelectItem value="rehber" className="text-white">
                              Rehber
                            </SelectItem>
                            <SelectItem value="teknoloji" className="text-white">
                              Teknoloji
                            </SelectItem>
                            <SelectItem value="sektör" className="text-white">
                              Sektör
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tags" className="text-gray-300">
                          Etiketler
                        </Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) => handleInputChange("tags", e.target.value)}
                          placeholder="etiket1, etiket2, etiket3"
                          className="bg-black/50 border-gray-700 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="author" className="text-gray-300">
                          Yazar
                        </Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => handleInputChange("author", e.target.value)}
                          className="bg-black/50 border-gray-700 text-white"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => handleInputChange("featured", checked)}
                        />
                        <Label htmlFor="featured" className="text-gray-300">
                          Öne Çıkan Blog
                        </Label>
                      </div>

                      <div>
                        <Label htmlFor="image" className="text-gray-300">
                          Kapak Resmi
                        </Label>
                        <div className="mt-2">
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="hidden"
                            disabled={isUploading}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("image")?.click()}
                            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Yükleniyor...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 mr-2" />
                                Resim Seç
                              </>
                            )}
                          </Button>
                        </div>
                        {formData.image && (
                          <div className="mt-4">
                            <img
                              src={formData.image || "/placeholder.svg"}
                              alt="Önizleme"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="content" className="text-gray-300">
                          İçerik *
                        </Label>
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) => handleInputChange("content", e.target.value)}
                          placeholder="Blog içeriğini girin"
                          className="bg-black/50 border-gray-700 text-white min-h-[300px]"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {contentType === "match" && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-gray-300">Oyun</Label>
                        <Select value={formData.game} onValueChange={(value) => handleInputChange("game", value)}>
                          <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="VALORANT" className="text-white">
                              VALORANT
                            </SelectItem>
                            <SelectItem value="LEAGUE OF LEGENDS" className="text-white">
                              League of Legends
                            </SelectItem>
                            <SelectItem value="FC 25" className="text-white">
                              FC 25
                            </SelectItem>
                            <SelectItem value="COUNTER STRIKE 2" className="text-white">
                              Counter Strike 2
                            </SelectItem>
                            <SelectItem value="APEX LEGENDS" className="text-white">
                              Apex Legends
                            </SelectItem>
                            <SelectItem value="ROCKET LEAGUE" className="text-white">
                              Rocket League
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tournament" className="text-gray-300">
                          Turnuva *
                        </Label>
                        <Input
                          id="tournament"
                          value={formData.tournament}
                          onChange={(e) => handleInputChange("tournament", e.target.value)}
                          placeholder="Turnuva adını girin"
                          className="bg-black/50 border-gray-700 text-white"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date" className="text-gray-300">
                            Tarih *
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange("date", e.target.value)}
                            className="bg-black/50 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time" className="text-gray-300">
                            Saat *
                          </Label>
                          <Input
                            id="time"
                            type="time"
                            value={formData.time}
                            onChange={(e) => handleInputChange("time", e.target.value)}
                            className="bg-black/50 border-gray-700 text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-300">Durum</Label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                          <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="upcoming" className="text-white">
                              Yaklaşan
                            </SelectItem>
                            <SelectItem value="completed" className="text-white">
                              Tamamlanan
                            </SelectItem>
                            <SelectItem value="live" className="text-white">
                              Canlı
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.status === "completed" && (
                        <div>
                          <Label className="text-gray-300">Sonuç</Label>
                          <Select value={formData.result} onValueChange={(value) => handleInputChange("result", value)}>
                            <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700">
                              <SelectItem value="win" className="text-white">
                                Zafer
                              </SelectItem>
                              <SelectItem value="loss" className="text-white">
                                Mağlubiyet
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-4 p-4 bg-black/30 rounded-lg border border-gray-800/30">
                        <h4 className="text-white font-medium">Takım A (Arena Bulls)</h4>
                        <div>
                          <Label htmlFor="teamAName" className="text-gray-300">
                            Takım Adı
                          </Label>
                          <Input
                            id="teamAName"
                            value={formData.teamAName}
                            onChange={(e) => handleInputChange("teamAName", e.target.value)}
                            className="bg-black/50 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="teamALogo" className="text-gray-300">
                            Logo
                          </Label>
                          <div className="mt-2">
                            <input
                              id="teamALogo"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "teamALogo")}
                              className="hidden"
                              disabled={isUploading}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("teamALogo")?.click()}
                              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
                              disabled={isUploading}
                            >
                              {isUploading ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Yükleniyor...
                                </>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Logo Seç
                                </>
                              )}
                            </Button>
                          </div>
                          {formData.teamALogo && (
                            <div className="mt-2">
                              <img
                                src={formData.teamALogo || "/placeholder.svg"}
                                alt="Team A Logo"
                                className="w-16 h-16 object-contain rounded"
                              />
                            </div>
                          )}
                        </div>
                        {formData.status === "completed" && (
                          <div>
                            <Label htmlFor="teamAScore" className="text-gray-300">
                              Skor
                            </Label>
                            <Input
                              id="teamAScore"
                              type="number"
                              value={formData.teamAScore}
                              onChange={(e) => handleInputChange("teamAScore", e.target.value)}
                              className="bg-black/50 border-gray-700 text-white"
                            />
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 p-4 bg-black/30 rounded-lg border border-gray-800/30">
                        <h4 className="text-white font-medium">Takım B (Rakip)</h4>
                        <div>
                          <Label htmlFor="teamBName" className="text-gray-300">
                            Takım Adı *
                          </Label>
                          <Input
                            id="teamBName"
                            value={formData.teamBName}
                            onChange={(e) => handleInputChange("teamBName", e.target.value)}
                            placeholder="Rakip takım adı"
                            className="bg-black/50 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="teamBLogo" className="text-gray-300">
                            Logo
                          </Label>
                          <div className="mt-2">
                            <input
                              id="teamBLogo"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "teamBLogo")}
                              className="hidden"
                              disabled={isUploading}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("teamBLogo")?.click()}
                              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800/50"
                              disabled={isUploading}
                            >
                              {isUploading ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Yükleniyor...
                                </>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Logo Seç
                                </>
                              )}
                            </Button>
                          </div>
                          {formData.teamBLogo && (
                            <div className="mt-2">
                              <img
                                src={formData.teamBLogo || "/placeholder.svg"}
                                alt="Team B Logo"
                                className="w-16 h-16 object-contain rounded"
                              />
                            </div>
                          )}
                        </div>
                        {formData.status === "completed" && (
                          <div>
                            <Label htmlFor="teamBScore" className="text-gray-300">
                              Skor
                            </Label>
                            <Input
                              id="teamBScore"
                              type="number"
                              value={formData.teamBScore}
                              onChange={(e) => handleInputChange("teamBScore", e.target.value)}
                              className="bg-black/50 border-gray-700 text-white"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className={`w-full py-4 text-lg ${
                      contentType === "news"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        : contentType === "blog"
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    } transition-all duration-500`}
                    disabled={isSubmitting || isUploading}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        {contentType === "news" ? "Haber" : contentType === "blog" ? "Blog" : "Maç"} Kaydet
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Import Tab */}
          <TabsContent value="import" className="space-y-8">
            <BlogImportTool />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
