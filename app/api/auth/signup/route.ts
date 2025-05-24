import { type NextRequest, NextResponse } from "next/server"
import { authHelpers } from "@/lib/supabase-helpers"

export async function POST(request: NextRequest) {
  try {
    const { email, password, ...userData } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const result = await authHelpers.signUp(email, password, userData)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: result.data,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
