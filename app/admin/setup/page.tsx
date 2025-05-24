"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Users, Key } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdminNav from "@/components/admin-nav"

export default function AdminSetup() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const setupTestAccounts = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/setup-test-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || "Failed to create test accounts")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Setup error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Admin Setup</h1>
            <p className="text-gray-600">Set up test accounts for development and testing</p>
          </div>

          <AdminNav />

          <Card className="border-green-100 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Create Test Accounts
              </CardTitle>
              <CardDescription>
                This will create two test accounts with sample data for testing the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Test User Account</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Complete user profile</li>
                      <li>• Sample documents</li>
                      <li>• Saved jobs</li>
                      <li>• Notifications</li>
                      <li>• Application status: Under Review</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Admin Account</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Admin privileges</li>
                      <li>• Complete profile</li>
                      <li>• HR background</li>
                      <li>• Application status: Resolved</li>
                    </ul>
                  </div>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                {result && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-700">
                      Test accounts created successfully! You can now use the credentials below to test the platform.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={setupTestAccounts}
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  {loading ? "Creating Accounts..." : "Create Test Accounts"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-green-600" />
                  Test Account Credentials
                </CardTitle>
                <CardDescription>Use these credentials to test the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3">👤 Test User Account</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        <code className="bg-white px-2 py-1 rounded">testuser@altroway.com</code>
                      </div>
                      <div>
                        <span className="font-medium">Password:</span>{" "}
                        <code className="bg-white px-2 py-1 rounded">testpass123</code>
                      </div>
                      <div>
                        <span className="font-medium">Role:</span> Regular User
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3">👑 Admin Account</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        <code className="bg-white px-2 py-1 rounded">admin@altroway.com</code>
                      </div>
                      <div>
                        <span className="font-medium">Password:</span>{" "}
                        <code className="bg-white px-2 py-1 rounded">adminpass123</code>
                      </div>
                      <div>
                        <span className="font-medium">Role:</span> Administrator
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">What to Test:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      1. Sign in with either account at <code>/auth/signin</code>
                    </li>
                    <li>2. Explore the dashboard with pre-loaded data</li>
                    <li>3. Test document management features</li>
                    <li>4. Browse and save job listings</li>
                    <li>5. Update profile information</li>
                    <li>6. Test all navigation and features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
