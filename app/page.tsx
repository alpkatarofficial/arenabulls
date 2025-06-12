import { Suspense } from "react"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

// Lazy load non-critical components
const GamesSection = dynamic(
  () => import("@/components/games-section").then((mod) => ({ default: mod.GamesSection })),
  {
    loading: () => <Skeleton className="w-full h-96" />,
  },
)

const PlayersSection = dynamic(
  () => import("@/components/players-section").then((mod) => ({ default: mod.PlayersSection })),
  {
    loading: () => <Skeleton className="w-full h-96" />,
  },
)

const LatestMatches = dynamic(
  () => import("@/components/latest-matches").then((mod) => ({ default: mod.LatestMatches })),
  {
    loading: () => <Skeleton className="w-full h-96" />,
  },
)

const NewsSlider = dynamic(() => import("@/components/news-slider").then((mod) => ({ default: mod.NewsSlider })), {
  loading: () => <Skeleton className="w-full h-64" />,
})

const BlogSlider = dynamic(() => import("@/components/blog-slider").then((mod) => ({ default: mod.BlogSlider })), {
  loading: () => <Skeleton className="w-full h-64" />,
})

const ProductsSection = dynamic(
  () => import("@/components/products-section").then((mod) => ({ default: mod.ProductsSection })),
  {
    loading: () => <Skeleton className="w-full h-96" />,
  },
)

const Sponsors = dynamic(() => import("@/components/sponsors").then((mod) => ({ default: mod.Sponsors })), {
  loading: () => <Skeleton className="w-full h-32" />,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />

      <main>
        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <GamesSection />
        </Suspense>

        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <PlayersSection />
        </Suspense>

        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <LatestMatches />
        </Suspense>

        <Suspense fallback={<Skeleton className="w-full h-64" />}>
          <NewsSlider />
        </Suspense>

        <Suspense fallback={<Skeleton className="w-full h-64" />}>
          <BlogSlider />
        </Suspense>

        <Suspense fallback={<Skeleton className="w-full h-96" />}>
          <ProductsSection />
        </Suspense>

        <Suspense fallback={<Skeleton className="w-full h-32" />}>
          <Sponsors />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
