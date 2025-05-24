import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    const supabase = createServerClient()

    let query = supabase.from("cms_content").select("*").order("updated_at", { ascending: false })

    if (type) {
      query = query.eq("type", type)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentData = await request.json()
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("cms_content")
      .insert([
        {
          ...contentData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Content created successfully",
      data,
    })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
