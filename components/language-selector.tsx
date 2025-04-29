"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type Language = {
  code: string
  name: string
  nativeName: string
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu" },
  { code: "et", name: "Estonian", nativeName: "Eesti" },
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="flex items-center text-sm font-medium" onClick={toggleDropdown}>
        <Globe className="h-4 w-4 mr-1" />
        <span>{selectedLanguage.code.toUpperCase()}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((language) => (
              <button
                key={language.code}
                className={cn(
                  "block px-4 py-2 text-sm text-left w-full hover:bg-gray-100",
                  selectedLanguage.code === language.code ? "bg-green-50 text-green-700" : "text-gray-700",
                )}
                role="menuitem"
                onClick={() => selectLanguage(language)}
              >
                <div className="flex justify-between items-center">
                  <span>{language.name}</span>
                  <span className="text-gray-500 text-xs">{language.nativeName}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

