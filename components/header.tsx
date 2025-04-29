"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  scrolled: boolean
}

export default function Header({ scrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-[#B0E0E6] shadow-md py-2" 
          : "bg-[#B0E0E6] py-4"
      )}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Guidex</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-100 font-medium transition-colors">
              Home
            </Link>
            <Link href="/jobs" className="text-white hover:text-gray-100 font-medium transition-colors">
              Jobs
            </Link>
            <Link href="/mentors" className="text-white hover:text-gray-100 font-medium transition-colors">
              Mentors
            </Link>
            <Link href="/guides" className="text-white hover:text-gray-100 font-medium transition-colors">
              Guides
            </Link>
            <Link href="/community" className="text-white hover:text-gray-100 font-medium transition-colors">
              Community
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-100 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 transition-colors"
            >
              Login
            </Button>
            <Button 
              className="bg-white text-[#8ecdd1] hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} \
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#B0E0E6] border-t border-white/20 mt-2">
          <div className="px-4 py-3 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/jobs" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 transition-colors"
              onClick={toggleMenu}
            >
              Jobs
            </Link>
            <Link 
              href="/mentors" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 transition-colors"
              onClick={toggleMenu}
            >
              Mentors
            </Link>
            <Link 
              href="/guides" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 transition-colors"
              onClick={toggleMenu}
            >
              Guides
            </Link>
            <Link 
              href="/community" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 transition-colors"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
          <div className="px-4 py-3 space-y-2 border-t border-white/20">
            <Button 
              variant="ghost" 
              className="w-full justify-center text-white hover:bg-white/20 transition-colors"
            >
              Login
            </Button>
            <Button 
              className="w-full justify-center bg-white text-[#8ecdd1] hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

