// Admin tool for importing blogs from blob storage
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Loader2, CheckCircle, XCircle, Info } from "lucide-react"

export function BlogImportTool() {
  const [blobUrls, setBlobUrls] = useState("")
  const [isImporting, setIsImporting] = useState(false)
  const [importResults, setImportResults] = useState<any>(null)

  const handleImport = async () => {
    if (!blobUrls.trim()) return

    setIsImporting(true)
    setImportResults(null)

    try {
      const urls = blobUrls
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url)

      console.log("📤 Importing blogs from URLs:", urls)

      const response = await fetch("/api/blog/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blobUrls: urls }),
      })

      const result = await response.json()
      setImportResults(result)

      if (result.success) {
        if (result.imported > 0) {
          alert(`✅ ${result.imported} blog başarıyla içe aktarıldı!`)
          setBlobUrls("")
        }
        if (result.failed > 0) {
          alert(`⚠️ ${result.failed} blog içe aktarılamadı. Detaylar için sonuçları kontrol edin.`)
        }
      } else {
        alert(`❌ İçe aktarma başarısız: ${result.error}`)
      }
    } catch (error) {
      console.error("Import error:", error)
      alert("❌ İçe aktarma sırasında hata oluştu!")
      setImportResults({ success: false, error: "Network error" })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-2xl shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/30 rounded-2xl">
            <FileText className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white font-bold">Blog İçe Aktarma</CardTitle>
            <p className="text-gray-400 mt-1">Blob Storage'dan metin dosyalarını blog olarak içe aktarın</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="text-sm text-blue-300">
              <p className="font-semibold mb-2">Dosya Formatı:</p>
              <pre className="text-xs bg-black/30 p-2 rounded text-gray-300">
                {`---
title: Blog Başlığı
excerpt: Kısa açıklama
category: analiz
author: Yazar Adı
tags: tag1, tag2, tag3
featured: true
---

# Blog İçeriği Buradan Başlar

Markdown formatında blog içeriğinizi yazın...`}
              </pre>
            </div>
          </div>
        </div>

        <div>
          <label className="text-gray-300 block mb-2">
            Blob Storage URL'leri <span className="text-red-400">*</span>
          </label>
          <Textarea
            value={blobUrls}
            onChange={(e) => setBlobUrls(e.target.value)}
            placeholder={`https://blob.vercel-storage.com/blog1.txt
https://blob.vercel-storage.com/blog2.txt
https://blob.vercel-storage.com/blog3.txt`}
            className="bg-black/50 border-gray-700 text-white min-h-[120px] font-mono text-sm"
            rows={6}
          />
          <p className="text-xs text-gray-400 mt-1">Her satırda bir URL yazın</p>
        </div>

        <Button
          onClick={handleImport}
          disabled={isImporting || !blobUrls.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-3"
        >
          {isImporting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              İçe Aktarılıyor...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 mr-2" />
              Blogları İçe Aktar
            </>
          )}
        </Button>

        {/* Results */}
        {importResults && (
          <div className="space-y-4">
            {importResults.success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h4 className="text-green-400 font-semibold">İçe Aktarma Başarılı</h4>
                </div>
                <div className="text-gray-300 space-y-2">
                  <p>✅ Başarılı: {importResults.imported} blog</p>
                  {importResults.failed > 0 && <p>❌ Başarısız: {importResults.failed} blog</p>}
                </div>

                {importResults.blogs && importResults.blogs.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">İçe aktarılan bloglar:</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {importResults.blogs.map((blog: any, index: number) => (
                        <div key={index} className="text-xs bg-black/30 p-2 rounded text-green-300">
                          📝 {blog.title} (/{blog.slug})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {importResults.errors && importResults.errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <h4 className="text-red-400 font-semibold">Hatalar</h4>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {importResults.errors.map((error: any, index: number) => (
                    <div key={index} className="text-xs bg-black/30 p-2 rounded text-red-300">
                      ❌ {error.url}: {error.error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!importResults.success && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <div>
                    <h4 className="text-red-400 font-semibold">İçe Aktarma Başarısız</h4>
                    <p className="text-gray-300 text-sm mt-1">{importResults.error || "Bilinmeyen hata"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
