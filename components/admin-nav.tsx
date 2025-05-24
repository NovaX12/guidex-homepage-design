"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Briefcase, FileText, Database } from "lucide-react"

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Jobs",
    href: "/admin/jobs",
    icon: Briefcase,
  },
  {
    title: "Content",
    href: "/admin/cms",
    icon: FileText,
  },
  {
    title: "Setup",
    href: "/admin/setup",
    icon: Database,
  },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="mb-8">
      <div className="flex flex-wrap gap-2">
        {adminNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn("flex items-center gap-2", isActive && "bg-green-500 hover:bg-green-600 text-white")}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
