"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Eye, Search } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  status: "active" | "inactive" | "draft"
  applicants: number
  postedAt: string
}

interface JobTableProps {
  onEdit?: (job: Job) => void
  onDelete?: (jobId: string) => void
  onView?: (job: Job) => void
}

export default function JobTable({ onEdit, onDelete, onView }: JobTableProps) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulate API call
        setJobs([
          {
            id: "1",
            title: "Software Engineer",
            company: "Tech Corp",
            location: "Berlin, Germany",
            type: "Full-time",
            status: "active",
            applicants: 15,
            postedAt: "2024-01-15",
          },
          {
            id: "2",
            title: "Data Analyst",
            company: "Data Solutions",
            location: "Amsterdam, Netherlands",
            type: "Contract",
            status: "active",
            applicants: 8,
            postedAt: "2024-01-14",
          },
          {
            id: "3",
            title: "Marketing Manager",
            company: "Marketing Plus",
            location: "Paris, France",
            type: "Full-time",
            status: "draft",
            applicants: 0,
            postedAt: "2024-01-13",
          },
        ])
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="border rounded-lg">
          <div className="h-12 bg-gray-100 border-b" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b last:border-b-0 bg-white" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                </TableCell>
                <TableCell>{job.applicants}</TableCell>
                <TableCell>{new Date(job.postedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onView?.(job)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onEdit?.(job)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete?.(job.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No jobs found matching your search criteria.</div>
      )}
    </div>
  )
}
