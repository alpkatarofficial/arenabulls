import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-900">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-red-500">404</h1>
          <h2 className="text-2xl font-semibold text-white">Sayfa Bulunamadı</h2>
          <p className="text-gray-300 max-w-md mx-auto">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
          <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            <Link href="/haberler">Haberleri Görüntüle</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
