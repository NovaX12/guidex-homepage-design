"use client"

import { Button } from "@/components/ui/button"
import { Bell, Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  title: string
  description?: string
}

export default function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <div className="mr-6 flex items-center space-x-2">
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
        </div>
        <div className="flex flex-1 items-center space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 md:w-[300px] lg:w-[400px]" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {description && (
        <div className="container pb-4">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
    </div>
  )
}
