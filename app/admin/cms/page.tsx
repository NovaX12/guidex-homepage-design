"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Save, Eye, FileText, Briefcase, Users, Settings, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdminNav from "@/components/admin-nav"

interface CMSContent {
  id: string
  type: "page" | "job" | "guide" | "testimonial" | "faq"
  title: string
  content: string
  status: "draft" | "published"
  created_at: string
  updated_at: string
  metadata?: any
}

export default function CMSAdmin() {
  const [content, setContent] = useState<CMSContent[]>([])
  const [activeTab, setActiveTab] = useState("pages")
  const [editingItem, setEditingItem] = useState<CMSContent | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadContent()
  }, [])

  // Update the loadContent function to use the actual API
  const loadContent = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cms/content")
      const result = await response.json()

      if (result.success) {
        setContent(result.data || [])
      } else {
        setMessage("Error loading content: " + (result.error || "Unknown error"))
      }
    } catch (error) {
      setMessage("Error loading content")
      console.error("Load content error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Update the handleSave function to use the actual API
  const handleSave = async (item: CMSContent) => {
    try {
      setLoading(true)

      const url = isCreating ? "/api/cms/content" : `/api/cms/content/${item.id}`
      const method = isCreating ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })

      const result = await response.json()

      if (result.success) {
        setMessage(isCreating ? "Content created successfully!" : "Content updated successfully!")
        loadContent() // Reload content
        setEditingItem(null)
        setIsCreating(false)
      } else {
        setMessage("Error saving content: " + result.error)
      }
    } catch (error) {
      setMessage("Error saving content")
      console.error("Save content error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Update the handleDelete function to use the actual API
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return

    try {
      setLoading(true)

      const response = await fetch(`/api/cms/content/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        setMessage("Content deleted successfully!")
        loadContent() // Reload content
      } else {
        setMessage("Error deleting content: " + result.error)
      }
    } catch (error) {
      setMessage("Error deleting content")
      console.error("Delete content error:", error)
    } finally {
      setLoading(false)
    }
  }

  const startCreating = (type: CMSContent["type"]) => {
    // Map tab names to content types
    const typeMap: Record<string, CMSContent["type"]> = {
      pages: "page",
      jobs: "job",
      guides: "guide",
      testimonials: "testimonial",
      faqs: "faq",
    }

    const contentType = typeMap[activeTab] || "page"

    setEditingItem({
      id: "",
      type: contentType,
      title: "",
      content: "",
      status: "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    setIsCreating(true)
  }

  const filteredContent = content.filter((item) => {
    switch (activeTab) {
      case "pages":
        return item.type === "page"
      case "jobs":
        return item.type === "job"
      case "guides":
        return item.type === "guide"
      case "testimonials":
        return item.type === "testimonial"
      case "faqs":
        return item.type === "faq"
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Content Management System</h1>
            <AdminNav />
            <p className="text-gray-600">Manage all website content from one place</p>
          </div>

          {message && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-700">{message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <Card className="lg:col-span-1 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  Content Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                  <TabsList className="grid w-full grid-cols-1 h-auto">
                    <TabsTrigger value="pages" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Pages
                    </TabsTrigger>
                    <TabsTrigger value="jobs" className="justify-start">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Jobs
                    </TabsTrigger>
                    <TabsTrigger value="guides" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Guides
                    </TabsTrigger>
                    <TabsTrigger value="testimonials" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Testimonials
                    </TabsTrigger>
                    <TabsTrigger value="faqs" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      FAQs
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="mt-6 space-y-2">
                  <Button
                    onClick={() => startCreating(activeTab.slice(0, -1) as CMSContent["type"])}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {editingItem ? (
                <ContentEditor
                  item={editingItem}
                  isCreating={isCreating}
                  onSave={handleSave}
                  onCancel={() => {
                    setEditingItem(null)
                    setIsCreating(false)
                  }}
                  loading={loading}
                />
              ) : (
                <ContentList
                  content={filteredContent}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

interface ContentEditorProps {
  item: CMSContent
  isCreating: boolean
  onSave: (item: CMSContent) => void
  onCancel: () => void
  loading: boolean
}

function ContentEditor({ item, isCreating, onSave, onCancel, loading }: ContentEditorProps) {
  const [formData, setFormData] = useState(item)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      updated_at: new Date().toISOString(),
    })
  }

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle>{isCreating ? `Create New ${item.type}` : `Edit ${item.type}`}</CardTitle>
        <CardDescription>{isCreating ? "Add new content to your website" : "Update existing content"}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as "draft" | "published" }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Enter content"
              rows={8}
              required
            />
          </div>

          {/* Type-specific fields */}
          {item.type === "job" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.metadata?.company || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metadata: { ...prev.metadata, company: e.target.value },
                    }))
                  }
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.metadata?.location || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metadata: { ...prev.metadata, location: e.target.value },
                    }))
                  }
                  placeholder="Job location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  value={formData.metadata?.salary || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metadata: { ...prev.metadata, salary: e.target.value },
                    }))
                  }
                  placeholder="e.g., 2000-3000"
                />
              </div>
            </div>
          )}

          {item.type === "testimonial" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.metadata?.author || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      metadata: { ...prev.metadata, author: e.target.value },
                    }))
                  }
                  placeholder="Author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Select
                  value={formData.metadata?.rating?.toString() || "5"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      metadata: { ...prev.metadata, rating: Number.parseInt(value) },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 text-white">
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

interface ContentListProps {
  content: CMSContent[]
  onEdit: (item: CMSContent) => void
  onDelete: (id: string) => void
  loading: boolean
}

function ContentList({ content, onEdit, onDelete, loading }: ContentListProps) {
  if (loading) {
    return (
      <Card className="border-green-100">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Loading content...</p>
        </CardContent>
      </Card>
    )
  }

  if (content.length === 0) {
    return (
      <Card className="border-green-100">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No content found. Create your first item!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <Card key={item.id} className="border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge
                    variant={item.status === "published" ? "default" : "secondary"}
                    className={item.status === "published" ? "bg-green-100 text-green-800" : ""}
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.content}</p>
                <p className="text-xs text-gray-500">Updated: {new Date(item.updated_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button variant="ghost" size="icon" onClick={() => onEdit(item)} className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
