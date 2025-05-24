import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function auth() {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { user, error }
}
