import { NextResponse } from "next/server"
import { userHelpers } from "@/lib/supabase-helpers"

export async function GET() {
  try {
    const users = await userHelpers.getAllUsers()
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
