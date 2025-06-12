// Simplified storage service using only Vercel Blob
export interface UploadResult {
  success: boolean
  url?: string
  publicId?: string
  error?: string
}

export class StorageService {
  async uploadImage(file: File, folder = "content"): Promise<UploadResult> {
    try {
      // Use the existing upload API endpoint
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()

      return {
        success: true,
        url,
        publicId: url.split("/").pop() || "",
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      }
    }
  }

  async deleteImage(publicId: string): Promise<boolean> {
    try {
      // Vercel Blob delete implementation would go here
      console.log("Resim siliniyor:", publicId)
      return true
    } catch (error) {
      console.error("Resim silinirken hata:", error)
      return false
    }
  }
}

// Default storage service instance
export const storageService = new StorageService()
