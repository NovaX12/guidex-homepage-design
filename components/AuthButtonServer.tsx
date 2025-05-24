import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AuthButtonServer() {
  const { user } = await auth()

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
        <Button asChild variant="outline">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <form action="/auth/signout" method="post">
          <Button type="submit" variant="ghost">
            Sign Out
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Button asChild variant="ghost">
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/signup">Sign Up</Link>
      </Button>
    </div>
  )
}
