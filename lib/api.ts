// API utilities for news management
import type { NewsItem } from "./news"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface CreateNewsRequest {
  title: string
  content: string
  excerpt: string
  category: "haber" | "duyuru"
  featured: boolean
  author: string
  image?: string
}

export interface UpdateNewsRequest extends CreateNewsRequest {
  id: string
}

export interface UploadImageResponse {
  success: boolean
  url?: string
  message?: string
}

// Geçici API fonksiyonları - gerçek uygulamada backend API'ye bağlanacak
export async function createNews(data: CreateNewsRequest): Promise<ApiResponse<NewsItem>> {
  try {
    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newNews: NewsItem = {
      id: Date.now().toString(),
      ...data,
      slug: generateSlug(data.title),
      date: new Date().toISOString().split("T")[0],
    }

    // Gerçek uygulamada veritabanına kaydedilecek
    console.log("Yeni haber oluşturuldu:", newNews)

    return {
      success: true,
      data: newNews,
      message: "Haber başarıyla oluşturuldu",
    }
  } catch (error) {
    return {
      success: false,
      error: "Haber oluşturulurken bir hata oluştu",
    }
  }
}

export async function updateNews(data: UpdateNewsRequest): Promise<ApiResponse<NewsItem>> {
  try {
    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedNews: NewsItem = {
      ...data,
      slug: generateSlug(data.title),
      date: new Date().toISOString().split("T")[0], // Gerçek uygulamada orijinal tarih korunacak
    }

    // Gerçek uygulamada veritabanında güncellenecek
    console.log("Haber güncellendi:", updatedNews)

    return {
      success: true,
      data: updatedNews,
      message: "Haber başarıyla güncellendi",
    }
  } catch (error) {
    return {
      success: false,
      error: "Haber güncellenirken bir hata oluştu",
    }
  }
}

export async function deleteNews(id: string): Promise<ApiResponse<void>> {
  try {
    // Simüle edilmiş API çağrısı
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Gerçek uygulamada veritabanından silinecek
    console.log("Haber silindi:", id)

    return {
      success: true,
      message: "Haber başarıyla silindi",
    }
  } catch (error) {
    return {
      success: false,
      error: "Haber silinirken bir hata oluştu",
    }
  }
}

export async function uploadImage(file: File): Promise<UploadImageResponse> {
  try {
    // Simüle edilmiş resim yükleme
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Gerçek uygulamada cloud storage'a yüklenecek (AWS S3, Cloudinary, etc.)
    const imageUrl = URL.createObjectURL(file)

    return {
      success: true,
      url: imageUrl,
      message: "Resim başarıyla yüklendi",
    }
  } catch (error) {
    return {
      success: false,
      message: "Resim yüklenirken bir hata oluştu",
    }
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
