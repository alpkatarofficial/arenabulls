// Blog importer for text files from blob storage
import { DatabaseService } from "./database"

export interface BlogFileStructure {
  title: string
  excerpt: string
  category: string
  author: string
  tags: string[]
  featured: boolean
  content: string
}

export class BlogImporter {
  // Parse blog from text file
  static parseBlogFile(fileContent: string): BlogFileStructure {
    const lines = fileContent.split("\n")
    const metadata: any = {}
    let contentStartIndex = 0

    // Parse metadata (first lines starting with ---)
    if (lines[0] === "---") {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === "---") {
          contentStartIndex = i + 1
          break
        }
        const [key, ...valueParts] = lines[i].split(":")
        const value = valueParts.join(":").trim()

        if (key === "tags") {
          metadata[key] = value.split(",").map((tag) => tag.trim())
        } else if (key === "featured") {
          metadata[key] = value.toLowerCase() === "true"
        } else {
          metadata[key] = value
        }
      }
    }

    // Get content (everything after metadata)
    const content = lines.slice(contentStartIndex).join("\n").trim()

    return {
      title: metadata.title || "Untitled",
      excerpt: metadata.excerpt || "",
      category: metadata.category || "analiz",
      author: metadata.author || "Arena Bulls Medya",
      tags: metadata.tags || [],
      featured: metadata.featured || false,
      content: content,
    }
  }

  // Generate slug from title
  static generateSlug(title: string): string {
    return (
      title
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
    )
  }

  // Import blog from blob storage
  static async importFromBlob(blobUrl: string): Promise<any> {
    try {
      console.log("🔄 Fetching blog from:", blobUrl)
      const response = await fetch(blobUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
      }

      const fileContent = await response.text()
      console.log("📄 File content length:", fileContent.length)

      const blogData = this.parseBlogFile(fileContent)
      console.log("📝 Parsed blog data:", blogData.title)

      // Generate unique slug
      const baseSlug = this.generateSlug(blogData.title)
      const timestamp = Date.now().toString().slice(-4)
      const slug = `${baseSlug}-${timestamp}`

      // Create blog post
      const blog = await DatabaseService.createBlog({
        ...blogData,
        slug: slug,
        date: new Date().toISOString().split("T")[0],
        readTime: Math.ceil(blogData.content.length / 1000) * 2,
        image: "/placeholder.svg?height=400&width=600&text=Blog+Image",
      })

      console.log("✅ Blog created successfully:", blog.id)
      return blog
    } catch (error) {
      console.error("❌ Error importing blog from blob:", error)
      throw error
    }
  }

  // Batch import multiple blogs
  static async batchImportFromBlobs(blobUrls: string[]): Promise<any[]> {
    const results = []
    const errors = []

    for (const url of blobUrls) {
      try {
        const blog = await this.importFromBlob(url)
        results.push(blog)
        console.log(`✅ Imported blog: ${blog.title}`)
      } catch (error) {
        console.error(`❌ Failed to import from ${url}:`, error)
        errors.push({ url, error: error.message })
      }
    }

    return { success: results, errors }
  }
}
