import { userHelpers, jobHelpers, applicationHelpers } from "@/lib/supabase-helpers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import AdminDashboard from "@/components/AdminDashboard"

async function getAdmin() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const admin = await userHelpers.isAdmin(user.id)

  if (!admin) {
    return redirect("/")
  }

  return user.id
}

export default async function AdminPage() {
  const adminId = await getAdmin()

  const users = await userHelpers.getAllUsers()
  const jobs = await jobHelpers.getAllJobs()
  const applications = await applicationHelpers.getAllApplications()

  return <AdminDashboard users={users} jobs={jobs} applications={applications} />
}
