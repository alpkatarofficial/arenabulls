import { DatabaseService } from "./database"

export interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  category: "duyuru" | "sponsorluk" | "transfer" | "etkinlik" | "haber"
  date: string
  slug: string
  featured: boolean
  author: string
}

export async function getAllNews(): Promise<NewsItem[]> {
  console.log("📚 Fetching all news")
  const news = await DatabaseService.getAllNews()
  console.log(`📚 Fetched ${news.length} news items`)
  return news.map((item) => ({
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
  }))
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  console.log("🌟 Fetching featured news")
  const news = await DatabaseService.getFeaturedNews()
  console.log(`🌟 Fetched ${news.length} featured news items`)
  return news.map((item) => ({
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
  }))
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  console.log(`🔍 Fetching news with slug: ${slug}`)
  const news = await DatabaseService.getNewsBySlug(slug)
  if (!news) {
    console.log(`❌ News not found with slug: ${slug}`)
    return undefined
  }

  console.log(`✅ News found with slug: ${slug}, title: ${news.title}`)
  return {
    id: news.id,
    title: news.title,
    content: news.content,
    excerpt: news.excerpt,
    image: news.image,
    category: news.category,
    date: news.date,
    slug: news.slug,
    featured: news.featured,
    author: news.author,
  }
}

export async function getNewsByCategory(
  category: "duyuru" | "sponsorluk" | "transfer" | "etkinlik" | "haber",
): Promise<NewsItem[]> {
  const allNews = await getAllNews()
  return allNews.filter((item) => item.category === category)
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    duyuru: "DUYURU",
    sponsorluk: "SPONSORLUK",
    transfer: "TRANSFER",
    etkinlik: "ETKİNLİK",
    haber: "HABER",
  }
  return labels[category] || category.toUpperCase()
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    duyuru: "bg-blue-600",
    sponsorluk: "bg-green-600",
    transfer: "bg-purple-600",
    etkinlik: "bg-orange-600",
    haber: "bg-[#0099ff]",
  }
  return colors[category] || "bg-gray-600"
}

export async function deleteNews(id: string): Promise<boolean> {
  return await DatabaseService.deleteNews(id)
}

export async function createNews(news: Omit<NewsItem, "id">): Promise<NewsItem> {
  const created = await DatabaseService.createNews({
    ...news,
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
  }
}

export async function updateNews(id: string, updates: Partial<NewsItem>): Promise<NewsItem | null> {
  const updated = await DatabaseService.updateNews(id, {
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
  }
}
