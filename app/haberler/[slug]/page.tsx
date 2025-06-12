import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { getNewsBySlug, getAllNews } from "@/lib/news"

interface PageProps {
  params: {
    slug: string
  }
}

// Bu sayfanın dinamik olarak oluşturulmasını sağlar
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HaberDetayPage({ params }: PageProps) {
  console.log(`🔍 Rendering news page for slug: ${params.slug}`)

  // Debug: Tüm haberleri listele
  const allNews = await getAllNews()
  console.log(`📰 Total news available: ${allNews.length}`)
  console.log(`📰 Available slugs: ${allNews.map((n) => n.slug).join(", ")}`)

  const news = await getNewsBySlug(params.slug)

  if (!news) {
    console.log(`❌ News not found for slug: ${params.slug}, redirecting to 404`)
    console.log(`📰 Searched in ${allNews.length} news items`)
    notFound()
  }

  console.log(`✅ News found for slug: ${params.slug}, title: ${news.title}`)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Article Header */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/haberler">
            <Button variant="ghost" className="text-[#0099ff] mb-6 hover:bg-[#0099ff]/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Haberlere Dön
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge
                variant={news.category === "haber" ? "default" : "secondary"}
                className={news.category === "haber" ? "bg-[#0099ff] text-white" : "bg-green-600 text-white"}
              >
                {news.category === "haber" ? "HABER" : news.category.toUpperCase()}
              </Badge>
            </div>

            <h1 className="hero-title text-3xl md:text-5xl mb-6 text-white">{news.title}</h1>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(news.date)}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {news.author}
                </div>
              </div>

              <Button variant="outline" className="border-[#0099ff] text-[#0099ff] hover:bg-[#0099ff] hover:text-white">
                <Share2 className="h-4 w-4 mr-2" />
                Paylaş
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Image */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              {news.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
