import { type NextRequest, NextResponse } from "next/server"
import { documentHelpers } from "@/lib/supabase-helpers"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const category = searchParams.get("category") as "migration" | "personal" | undefined

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const result = await documentHelpers.getUserDocuments(userId, category)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error("Documents fetch error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const userId = formData.get("userId") as string
    const file = formData.get("file") as File
    const type = formData.get("type") as string
    const category = formData.get("category") as "migration" | "personal"

    if (!userId || !file || !type || !category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const result = await documentHelpers.uploadDocument(userId, file, {
      type,
      category,
      status: "pending",
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Document uploaded successfully",
      data: result.data,
    })
  } catch (error) {
    console.error("Document upload error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
