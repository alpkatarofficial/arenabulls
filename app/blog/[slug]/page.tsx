import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react"
import { getBlogPostBySlug, getAllBlogPosts, getBlogCategoryLabel, getBlogCategoryColor } from "@/lib/blog"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Bu sayfanın dinamik olarak oluşturulmasını sağlar
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  console.log(`🔍 Rendering blog page for slug: ${params.slug}`)
  const blog = await getBlogPostBySlug(params.slug)

  if (!blog) {
    console.log(`❌ Blog not found for slug: ${params.slug}, redirecting to 404`)
    notFound()
  }

  console.log(`✅ Blog found for slug: ${params.slug}, title: ${blog.title}`)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get related blogs (same category, excluding current)
  const allBlogs = await getAllBlogPosts()
  const relatedBlogs = allBlogs.filter((item) => item.category === blog.category && item.id !== blog.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-purple-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Blog'a Geri Dön
            </Link>

            {/* Category Badge */}
            <div className="mb-6">
              <Badge className={`${getBlogCategoryColor(blog.category)} text-white font-medium px-4 py-2`}>
                {getBlogCategoryLabel(blog.category)}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{blog.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(blog.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{blog.readTime} dakika okuma</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{blog.content}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">İlgili Blog Yazıları</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <RelatedBlogCard key={relatedBlog.id} blog={relatedBlog} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

// Related Blog Card Component
function RelatedBlogCard({ blog }: { blog: any }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className="bg-[#141414] rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute top-4 left-4">
            <Badge className={`${getBlogCategoryColor(blog.category)} text-white font-medium px-3 py-1 text-xs`}>
              {getBlogCategoryLabel(blog.category)}
            </Badge>
          </div>

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

        <div className="p-6">
          <h3 className="font-bold text-lg mb-3 line-clamp-2 text-white group-hover:text-purple-400 transition-colors duration-300">
            {blog.title}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-3">{blog.excerpt}</p>
        </div>
      </article>
    </Link>
  )
}
