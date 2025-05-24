"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, FileText, Upload, AlertTriangle, CheckCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Document = {
  id: string
  name: string
  type: string
  uploadDate: Date
  expiryDate?: Date
  status: "valid" | "expiring" | "expired"
  file?: File
}

export default function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Passport.pdf",
      type: "Passport",
      uploadDate: new Date(2023, 4, 15),
      expiryDate: new Date(2028, 4, 15),
      status: "valid",
    },
    {
      id: "2",
      name: "Work_Visa.pdf",
      type: "Visa",
      uploadDate: new Date(2023, 0, 10),
      expiryDate: new Date(2023, 11, 10),
      status: "expiring",
    },
    {
      id: "3",
      name: "Degree_Certificate.pdf",
      type: "Certificate",
      uploadDate: new Date(2023, 2, 22),
      status: "valid",
    },
  ])

  const [isUploading, setIsUploading] = useState(false)
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    type: "Passport",
  })
  const [date, setDate] = useState<Date>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewDocument({
        ...newDocument,
        name: file.name,
        file: file,
      })
    }
  }

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate upload delay
    setTimeout(() => {
      const doc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: newDocument.name || "Unnamed Document",
        type: newDocument.type || "Other",
        uploadDate: new Date(),
        expiryDate: date,
        status: "valid",
        file: newDocument.file,
      }

      setDocuments([...documents, doc])
      setNewDocument({})
      setDate(undefined)
      setIsUploading(false)
    }, 1500)
  }

  const removeDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "expiring":
        return "bg-amber-100 text-amber-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "expiring":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card className="rounded-2xl overflow-hidden shadow-lg border-green-100">
      <div className="p-6 bg-white border-b border-green-100">
        <h3 className="text-xl font-semibold mb-2">Your Documents</h3>
        <p className="text-gray-600 text-sm">Keep track of all your important files</p>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:shadow-sm transition-all"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{doc.name}</p>
                    <Badge className="ml-2" variant="outline">
                      {doc.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>Uploaded {format(doc.uploadDate, "MMM d, yyyy")}</span>
                    {doc.expiryDate && (
                      <span className="ml-2 flex items-center">• Expires: {format(doc.expiryDate, "MMM d, yyyy")}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Badge className={cn("mr-2", getStatusColor(doc.status))}>
                  <span className="flex items-center">
                    {getStatusIcon(doc.status)}
                    <span className="ml-1">{doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}</span>
                  </span>
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-red-500"
                  onClick={() => removeDocument(doc.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-green-100 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-3">Upload New Document</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="document-type">Document Type</Label>
                <select
                  id="document-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newDocument.type}
                  onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                >
                  <option value="Passport">Passport</option>
                  <option value="Visa">Visa</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="expiry-date">Expiry Date (if applicable)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label htmlFor="file-upload">Upload File</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
              {newDocument.name && <p className="mt-2 text-sm text-green-600">Selected: {newDocument.name}</p>}
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={handleUpload}
          disabled={!newDocument.name || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
      </div>
    </Card>
  )
}
