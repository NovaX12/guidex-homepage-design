"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, Bookmark } from "lucide-react"
import { useState } from "react"

interface Vacancy {
  id: string
  title: string
  company: string
  location: string
  type: string
  experience: string
  description: string
  postedAt: string
  applicants: number
  deadline: string
}

interface VacancyCardProps {
  vacancy: Vacancy
  onSave?: (vacancyId: string) => void
  onApply?: (vacancyId: string) => void
  isSaved?: boolean
}

export default function VacancyCard({ vacancy, onSave, onApply, isSaved = false }: VacancyCardProps) {
  const [saved, setSaved] = useState(isSaved)

  const handleSave = () => {
    setSaved(!saved)
    onSave?.(vacancy.id)
  }

  const handleApply = () => {
    onApply?.(vacancy.id)
  }

  const isDeadlineSoon = () => {
    const deadline = new Date(vacancy.deadline)
    const now = new Date()
    const diffTime = deadline.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{vacancy.title}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground">{vacancy.company}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={saved ? "text-yellow-500" : "text-muted-foreground"}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </Button>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-1 h-3 w-3" />
            {vacancy.location}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" />
            {vacancy.applicants} applicants
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {new Date(vacancy.postedAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{vacancy.type}</Badge>
            <Badge variant="outline">{vacancy.experience}</Badge>
            {isDeadlineSoon() && <Badge variant="destructive">Deadline Soon</Badge>}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{vacancy.description}</p>

          <div className="text-sm">
            <span className="font-medium">Application Deadline: </span>
            <span className={isDeadlineSoon() ? "text-red-600" : "text-muted-foreground"}>
              {new Date(vacancy.deadline).toLocaleDateString()}
            </span>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button onClick={handleApply} className="flex-1">
              Apply Now
            </Button>
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
