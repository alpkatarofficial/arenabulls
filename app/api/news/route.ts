import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    console.log("📡 API: Fetching all news")
    const news = await DatabaseService.getAllNews()
    console.log(`📡 API: Returning ${news.length} news items`)
    return NextResponse.json(news)
  } catch (error) {
    console.error("❌ API Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("📡 API: Creating new news")
    const body = await request.json()

    const news = await DatabaseService.createNews({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      image: body.image || "",
      category: body.category,
      date: body.date || new Date().toISOString().split("T")[0],
      slug: body.slug,
      featured: body.featured || false,
      author: body.author || "Arena Bulls Medya",
    })

    console.log(`📡 API: News created successfully: ${news.title}`)

    // Force sync with global storage
    DatabaseService.syncWithGlobalStorage()

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error("❌ API Error creating news:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}
