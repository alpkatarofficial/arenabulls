// API endpoint for importing blogs from blob storage
import { type NextRequest, NextResponse } from "next/server"
import { BlogImporter } from "@/lib/blog-importer"

export async function POST(request: NextRequest) {
  try {
    const { blobUrls } = await request.json()

    if (!Array.isArray(blobUrls)) {
      return NextResponse.json({ error: "blobUrls must be an array" }, { status: 400 })
    }

    if (blobUrls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 })
    }

    console.log("🚀 Starting blog import for", blobUrls.length, "URLs")

    const result = await BlogImporter.batchImportFromBlobs(blobUrls)

    return NextResponse.json({
      success: true,
      imported: result.success.length,
      failed: result.errors.length,
      blogs: result.success,
      errors: result.errors,
    })
  } catch (error) {
    console.error("Blog import error:", error)
    return NextResponse.json(
      {
        error: "Import failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
