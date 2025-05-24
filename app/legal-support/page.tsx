import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Globe, Users, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LegalSupport() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Legal Support</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get professional legal assistance for your migration journey. Our partners provide expert guidance for
              visa applications, residence permits, and general migration issues.
            </p>
          </div>

          {/* Country Selection */}
          <Card className="mb-8 border-green-100">
            <CardHeader>
              <CardTitle>Select Your Destination Country</CardTitle>
              <CardDescription>Choose the country you want to migrate to for specific legal guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select destination country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="lithuania">Lithuania</SelectItem>
                  <SelectItem value="latvia">Latvia</SelectItem>
                  <SelectItem value="poland">Poland</SelectItem>
                  <SelectItem value="czech">Czech Republic</SelectItem>
                  <SelectItem value="slovenia">Slovenia</SelectItem>
                  <SelectItem value="slovakia">Slovakia</SelectItem>
                  <SelectItem value="hungary">Hungary</SelectItem>
                  <SelectItem value="croatia">Croatia</SelectItem>
                  <SelectItem value="romania">Romania</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Legal Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-100 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Application Documents</CardTitle>
                <CardDescription>Get help with preparing and reviewing your application documents</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Document preparation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Form completion assistance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Document review
                  </li>
                </ul>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Get Document Help</Button>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Issue of VISA / TRP</CardTitle>
                <CardDescription>
                  Professional assistance with visa and temporary residence permit applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Visa application support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    TRP guidance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Application tracking
                  </li>
                </ul>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Apply for VISA/TRP</Button>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>General Migration Issues</CardTitle>
                <CardDescription>
                  Comprehensive support for all your migration-related questions and concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Legal consultation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Rights and obligations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Problem resolution
                  </li>
                </ul>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Get General Support</Button>
              </CardContent>
            </Card>
          </div>

          {/* Document Types */}
          <Card className="mb-8 border-green-100">
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Common documents needed for migration applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Visa Applications</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Tourist Visa documents</li>
                    <li>• Work Visa documents</li>
                    <li>• Student Visa documents</li>
                    <li>• Family Reunion Visa documents</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Temporary Residence Permits</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Work-based TRP</li>
                    <li>• Study-based TRP</li>
                    <li>• Family-based TRP</li>
                    <li>• Investment-based TRP</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Personal Documents</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Passport</li>
                    <li>• Driver's license (if needed)</li>
                    <li>• Educational diplomas/certificates</li>
                    <li>• Police clearance certificate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Additional Requirements</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Medical certificates</li>
                    <li>• Financial statements</li>
                    <li>• Employment contracts</li>
                    <li>• Housing agreements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Partners */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Our Legal Partners</CardTitle>
              <CardDescription>Trusted legal professionals across Europe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {legalPartners.map((partner, index) => (
                  <div key={index} className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.location}</p>
                    <p className="text-xs text-gray-500">{partner.specialization}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const legalPartners = [
  {
    name: "European Law Firm",
    location: "Germany",
    specialization: "Immigration Law",
  },
  {
    name: "Baltic Legal Services",
    location: "Lithuania",
    specialization: "Residence Permits",
  },
  {
    name: "Central Europe Legal",
    location: "Poland",
    specialization: "Work Visas",
  },
  {
    name: "Migration Experts Ltd",
    location: "Czech Republic",
    specialization: "Family Reunification",
  },
]
