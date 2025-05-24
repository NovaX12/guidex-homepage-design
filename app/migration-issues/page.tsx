import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function MigrationIssues() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">General Migration Issues</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get help with any migration-related questions or issues you may have. Our experts are here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Submit Your Question
                </CardTitle>
                <CardDescription>
                  Describe your migration issue and we'll get back to you with expert advice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Destination Country</Label>
                    <Select>
                      <SelectTrigger>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issue-type">Issue Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa Application</SelectItem>
                        <SelectItem value="residence">Residence Permit</SelectItem>
                        <SelectItem value="work">Work Authorization</SelectItem>
                        <SelectItem value="family">Family Reunification</SelectItem>
                        <SelectItem value="documents">Document Recognition</SelectItem>
                        <SelectItem value="housing">Housing Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Describe Your Issue</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide as much detail as possible about your migration issue..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Submit Question
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ and Contact Info */}
            <div className="space-y-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-green-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-medium mb-2">{faq.question}</h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Direct Contact</CardTitle>
                  <CardDescription>Need immediate assistance? Contact us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600">+370 6123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@altroway.com</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Office Hours</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 - 15:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const faqs = [
  {
    question: "How long does the visa application process take?",
    answer:
      "Processing times vary by country and visa type, typically ranging from 2-8 weeks. We'll provide specific timelines based on your destination.",
  },
  {
    question: "What documents do I need for a work visa?",
    answer:
      "Common requirements include passport, job offer letter, educational certificates, medical certificate, and police clearance. Specific requirements vary by country.",
  },
  {
    question: "Can I bring my family with me?",
    answer:
      "Most countries allow family reunification for spouses and dependent children. Requirements and timelines vary by country and your visa type.",
  },
  {
    question: "Do I need to speak the local language?",
    answer:
      "Language requirements vary by country and visa type. Some countries require basic language proficiency, while others don't have language requirements for certain visa categories.",
  },
  {
    question: "How much money do I need to show for my application?",
    answer:
      "Financial requirements vary significantly by country and visa type. We'll help you determine the specific amount needed for your situation.",
  },
]
