"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, LogOut, Eye } from "lucide-react"
import { getAllNews } from "@/lib/news"

export default function AdminHaberlerPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const allNews = getAllNews()

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
    } else {
      router.push("/admin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Haber Yönetimi</h1>
            <p className="text-gray-400">Haberler ve duyuruları yönetin</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/haberler/yeni">
              <Button className="bg-[#0099ff] hover:bg-[#0099ff]/80">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Haber
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#111111] border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Toplam Haber</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{allNews.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111] border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Haberler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {allNews.filter((n) => n.category === "haber").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111111] border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Duyurular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {allNews.filter((n) => n.category === "duyuru").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* News List */}
        <Card className="bg-[#111111] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Tüm Haberler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allNews.map((news) => (
                <div
                  key={news.id}
                  className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{news.title}</h3>
                      <Badge
                        variant={news.category === "haber" ? "default" : "secondary"}
                        className={news.category === "haber" ? "bg-[#0099ff] text-white" : "bg-green-600 text-white"}
                      >
                        {news.category === "haber" ? "HABER" : "DUYURU"}
                      </Badge>
                      {news.featured && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          ÖNE ÇIKAN
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{news.excerpt}</p>
                    <div className="text-xs text-gray-500">
                      {formatDate(news.date)} • {news.author}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/haberler/${news.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/haberler/duzenle/${news.id}`}>
                      <Button variant="ghost" size="sm" className="text-[#0099ff] hover:text-white hover:bg-[#0099ff]">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-white hover:bg-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
