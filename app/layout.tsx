import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Arena Bulls - Türkiye'nin E-Spor Takımı",
  description: "Valorant, League of Legends, CS2 ve FC25 sahnesinde yükselen yerli e-spor takımı Arena Bulls",
  keywords: "esports, gaming, valorant, league of legends, cs2, fc25, türkiye, arena bulls",
  authors: [{ name: "Arena Bulls" }],
  creator: "Arena Bulls",
  publisher: "Arena Bulls",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://arenabulls.com"),
  openGraph: {
    title: "Arena Bulls - Türkiye'nin E-Spor Takımı",
    description: "Valorant, League of Legends, CS2 ve FC25 sahnesinde yükselen yerli e-spor takımı",
    url: "https://arenabulls.com",
    siteName: "Arena Bulls",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arena Bulls",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena Bulls - Türkiye'nin E-Spor Takımı",
    description: "Valorant, League of Legends, CS2 ve FC25 sahnesinde yükselen yerli e-spor takımı",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
