import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    const blogs = await DatabaseService.getAllBlogs()
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const blog = await DatabaseService.createBlog({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      image: body.image || "",
      category: body.category,
      date: body.date || new Date().toISOString().split("T")[0],
      slug: body.slug,
      featured: body.featured || false,
      author: body.author || "Arena Bulls Medya",
      readTime: body.readTime || Math.ceil(body.content.length / 1000) * 2,
      tags: body.tags || [],
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
