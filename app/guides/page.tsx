"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Guides() {
  const { user, profile, updateProfile } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    mobile: profile?.mobile || "",
    email: profile?.email || user?.email || "",
    city_of_birth: profile?.city_of_birth || "",
    date_of_birth: profile?.date_of_birth || "",
    address: profile?.address || "",
    education_level: profile?.education_level || "",
    diplomas_certificates: profile?.diplomas_certificates || "",
    work_experience: profile?.work_experience || "",
    language_skills: profile?.language_skills || "",
    about_me: profile?.about_me || "",
    agreement: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.agreement) {
      setError("You must agree to the terms and conditions")
      setLoading(false)
      return
    }

    if (!user) {
      setError("You must be logged in to submit this form")
      setLoading(false)
      return
    }

    try {
      const { agreement, ...profileData } = formData
      const result = await updateProfile(profileData)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(result.error || "Failed to update profile")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-8 px-4">
          <Card className="w-full max-w-md border-green-100">
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-4">Please sign in to access personalized migration guides.</p>
              <div className="space-y-2">
                <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <a href="/auth/signin">Sign In</a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="/auth/signup">Create Account</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-8 px-4">
          <Card className="w-full max-w-md border-green-100">
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Profile Updated!</h2>
              <p className="text-gray-600 mb-4">Your information has been saved successfully.</p>
              <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Let's get to know You..</h1>
            <p className="text-gray-600">
              Update your profile to receive personalized migration guidance based on your background.
            </p>
          </div>

          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                Personal Information Form
              </CardTitle>
              <CardDescription>
                Please provide accurate information to help us create the best migration plan for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.first_name}
                      onChange={(e) => handleChange("first_name", e.target.value)}
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.last_name}
                      onChange={(e) => handleChange("last_name", e.target.value)}
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleChange("mobile", e.target.value)}
                      placeholder="Your mobile number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email ID *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Your email address"
                      required
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cityOfBirth">City of Birth *</Label>
                    <Input
                      id="cityOfBirth"
                      value={formData.city_of_birth}
                      onChange={(e) => handleChange("city_of_birth", e.target.value)}
                      placeholder="Your city of birth"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => handleChange("date_of_birth", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address of Residence *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Your current address"
                    required
                  />
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level *</Label>
                    <Select
                      value={formData.education_level}
                      onValueChange={(value) => handleChange("education_level", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="secondary">Secondary</SelectItem>
                        <SelectItem value="specialised">Specialised</SelectItem>
                        <SelectItem value="higher">Higher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diplomas">Diplomas / Certificates</Label>
                    <Textarea
                      id="diplomas"
                      value={formData.diplomas_certificates}
                      onChange={(e) => handleChange("diplomas_certificates", e.target.value)}
                      placeholder="List your diplomas and certificates"
                    />
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-2">
                  <Label htmlFor="workExperience">Work Experience</Label>
                  <Textarea
                    id="workExperience"
                    value={formData.work_experience}
                    onChange={(e) => handleChange("work_experience", e.target.value)}
                    placeholder="Describe your work experience"
                    rows={4}
                  />
                </div>

                {/* Language Skills */}
                <div className="space-y-2">
                  <Label htmlFor="languageSkills">Language Skills</Label>
                  <Textarea
                    id="languageSkills"
                    value={formData.language_skills}
                    onChange={(e) => handleChange("language_skills", e.target.value)}
                    placeholder="List your language skills and proficiency levels"
                  />
                </div>

                {/* About Me */}
                <div className="space-y-2">
                  <Label htmlFor="aboutMe">Personal / About Me</Label>
                  <Textarea
                    id="aboutMe"
                    value={formData.about_me}
                    onChange={(e) => handleChange("about_me", e.target.value)}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreement"
                    checked={formData.agreement}
                    onCheckedChange={(checked) => handleChange("agreement", checked as boolean)}
                    required
                  />
                  <Label htmlFor="agreement" className="text-sm">
                    I agree to the processing of my personal information for migration guidance purposes *
                  </Label>
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white">
                  {loading ? "Updating Information..." : "Update Information"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
