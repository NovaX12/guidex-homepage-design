"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react"
import { useState } from "react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  description: string
  postedAt: string
  requirements: string[]
}

interface JobCardProps {
  job: Job
  onSave?: (jobId: string) => void
  onApply?: (jobId: string) => void
  isSaved?: boolean
}

export default function JobCard({ job, onSave, onApply, isSaved = false }: JobCardProps) {
  const [saved, setSaved] = useState(isSaved)

  const handleSave = () => {
    setSaved(!saved)
    onSave?.(job.id)
  }

  const handleApply = () => {
    onApply?.(job.id)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground">{job.company}</CardDescription>
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
            {job.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1 h-3 w-3" />
            {job.salary}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {new Date(job.postedAt).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{job.type}</Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{req}</span>
                  </li>
                ))}
                {job.requirements.length > 3 && (
                  <li className="text-xs text-muted-foreground">+{job.requirements.length - 3} more requirements</li>
                )}
              </ul>
            </div>
          )}

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
