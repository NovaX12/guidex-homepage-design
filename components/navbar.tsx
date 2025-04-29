"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import LanguageSelector from "./language-selector"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-[#B0E0E6] bg-clip-text text-transparent">
                Guidex
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-green-600 transition-colors">
              Features
            </Link>
            <Link href="/jobs" className="text-sm font-medium hover:text-green-600 transition-colors">
              Jobs
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-green-600 transition-colors">
              Community
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-green-500 to-[#B0E0E6] text-white">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSelector />
            <button className="p-2 rounded-md hover:bg-gray-100" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-green-600 transition-colors">
              Features
            </Link>
            <Link href="/jobs" className="text-sm font-medium hover:text-green-600 transition-colors">
              Jobs
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-green-600 transition-colors">
              Community
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="ghost" size="sm" className="justify-center">
                Login
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-[#B0E0E6] text-white justify-center">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

