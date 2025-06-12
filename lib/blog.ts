import { DatabaseService } from "./database"

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  category: "analiz" | "strateji" | "röportaj" | "rehber" | "teknoloji" | "sektör"
  date: string
  slug: string
  featured: boolean
  author: string
  readTime: number
  tags: string[]
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  console.log("📚 Fetching all blogs")
  const blogs = await DatabaseService.getAllBlogs()
  console.log(`📚 Fetched ${blogs.length} blog items`)
  return blogs.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    excerpt: item.excerpt,
    image: item.image,
    category: item.category,
    date: item.date,
    slug: item.slug,
    featured: item.featured,
    author: item.author,
    readTime: item.readTime,
    tags: item.tags,
  }))
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  console.log("🌟 Fetching featured blogs")
  const blogs = await DatabaseService.getFeaturedBlogs()
  console.log(`🌟 Fetched ${blogs.length} featured blog items`)
  return blogs.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    excerpt: item.excerpt,
    image: item.image,
    category: item.category,
    date: item.date,
    slug: item.slug,
    featured: item.featured,
    author: item.author,
    readTime: item.readTime,
    tags: item.tags,
  }))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  console.log(`🔍 Fetching blog with slug: ${slug}`)
  const blog = await DatabaseService.getBlogBySlug(slug)
  if (!blog) {
    console.log(`❌ Blog not found with slug: ${slug}`)
    return undefined
  }

  console.log(`✅ Blog found with slug: ${slug}, title: ${blog.title}`)
  return {
    id: blog.id,
    title: blog.title,
    content: blog.content,
    excerpt: blog.excerpt,
    image: blog.image,
    category: blog.category,
    date: blog.date,
    slug: blog.slug,
    featured: blog.featured,
    author: blog.author,
    readTime: blog.readTime,
    tags: blog.tags,
  }
}

export async function getBlogPostsByCategory(
  category: "analiz" | "strateji" | "röportaj" | "rehber" | "teknoloji" | "sektör",
): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogPosts()
  return allBlogs.filter((post) => post.category === category)
}

export function getBlogCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    analiz: "ANALİZ",
    strateji: "STRATEJİ",
    röportaj: "RÖPORTAJ",
    rehber: "REHBER",
    teknoloji: "TEKNOLOJİ",
    sektör: "SEKTÖR",
  }
  return labels[category] || category.toUpperCase()
}

export function getBlogCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    analiz: "bg-blue-600",
    strateji: "bg-green-600",
    röportaj: "bg-purple-600",
    rehber: "bg-orange-600",
    teknoloji: "bg-cyan-600",
    sektör: "bg-red-600",
  }
  return colors[category] || "bg-gray-600"
}

export async function deleteBlog(id: string): Promise<boolean> {
  return await DatabaseService.deleteBlog(id)
}

export async function createBlog(blog: Omit<BlogPost, "id">): Promise<BlogPost> {
  const created = await DatabaseService.createBlog({
    ...blog,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return {
    id: created.id,
    title: created.title,
    content: created.content,
    excerpt: created.excerpt,
    image: created.image,
    category: created.category,
    date: created.date,
    slug: created.slug,
    featured: created.featured,
    author: created.author,
    readTime: created.readTime,
    tags: created.tags,
  }
}

export async function updateBlog(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const updated = await DatabaseService.updateBlog(id, {
    ...updates,
    updatedAt: new Date(),
  })

  if (!updated) return null

  return {
    id: updated.id,
    title: updated.title,
    content: updated.content,
    excerpt: updated.excerpt,
    image: updated.image,
    category: updated.category,
    date: updated.date,
    slug: updated.slug,
    featured: updated.featured,
    author: updated.author,
    readTime: updated.readTime,
    tags: updated.tags,
  }
}
