"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { getAllNews } from "@/lib/news"

interface PageProps {
  params: {
    id: string
  }
}

export default function HaberDuzenlePage({ params }: PageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "haber" as "haber" | "duyuru",
    featured: false,
    author: "Arena Bulls Medya",
    image: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newsFound, setNewsFound] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)

      // Haberi yükle
      const allNews = getAllNews()
      const news = allNews.find((n) => n.id === params.id)

      if (news) {
        setFormData({
          title: news.title,
          content: news.content,
          excerpt: news.excerpt,
          category: news.category,
          featured: news.featured,
          author: news.author,
          image: news.image,
        })
        setNewsFound(true)
      }
    } else {
      router.push("/admin")
    }
  }, [router, params.id])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }))
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Gerçek uygulamada burada API çağrısı yapılacak
      const updatedNews = {
        id: params.id,
        ...formData,
        slug: generateSlug(formData.title),
      }

      console.log("Güncellenen haber:", updatedNews)

      alert("Haber başarıyla güncellendi!")
      router.push("/admin/haberler")
    } catch (error) {
      console.error("Haber güncellenirken hata:", error)
      alert("Haber güncellenirken bir hata oluştu!")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  if (!newsFound) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Haber Bulunamadı</h1>
          <Link href="/admin/haberler">
            <Button className="bg-[#0099ff] hover:bg-[#0099ff]/80">Admin Paneline Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/haberler">
            <Button variant="ghost" className="text-[#0099ff] hover:bg-[#0099ff]/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Haber Düzenle</h1>
            <p className="text-gray-400">Mevcut haberi düzenleyin</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ana Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Haber Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      className="bg-black/50 border-gray-700 text-white min-h-[100px]"
                      required
                    />
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
                </CardContent>
              </Card>

              {/* Resim Yükleme */}
              <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Kapak Resmi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image" className="text-gray-300">
                        Resim Yükle
                      </Label>
                      <div className="mt-2">
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("image")?.click()}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Yeni Resim Seç
                        </Button>
                      </div>
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
                </CardContent>
              </Card>
            </div>

            {/* Yan Panel */}
            <div className="space-y-6">
              <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Yayın Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Kategori</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: "haber" | "duyuru") => handleInputChange("category", value)}
                    >
                      <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111] border-gray-700">
                        <SelectItem value="haber" className="text-white">
                          Haber
                        </SelectItem>
                        <SelectItem value="duyuru" className="text-white">
                          Duyuru
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
                </CardContent>
              </Card>

              {/* Önizleme */}
              <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Önizleme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">
                      Slug: {formData.title ? generateSlug(formData.title) : "haber-basligi"}
                    </div>
                    <div className="text-sm text-gray-400">
                      Kategori: {formData.category === "haber" ? "Haber" : "Duyuru"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Güncelle Butonu */}
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#0099ff] hover:bg-[#0099ff]/80">
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
