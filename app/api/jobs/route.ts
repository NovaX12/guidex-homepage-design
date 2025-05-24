import { type NextRequest, NextResponse } from "next/server"
import { jobHelpers } from "@/lib/supabase-helpers"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || undefined
    const industry = searchParams.get("industry") || undefined
    const search = searchParams.get("search") || undefined
    const urgent = searchParams.get("urgent") === "true" || undefined

    const result = await jobHelpers.getAllJobs({
      country,
      industry,
      search,
      urgent,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error("Jobs fetch error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    const result = await jobHelpers.createJob(jobData)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Job created successfully",
      data: result.data,
    })
  } catch (error) {
    console.error("Job creation error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
