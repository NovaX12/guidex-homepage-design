import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Globe,
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare,
  Bell,
  ChevronRight,
  Check,
  Quote,
  MapPin,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import StatusBar from "@/components/status-bar"
import DocumentUpload from "@/components/document-upload"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-400 via-green-300 to-[#B0E0E6] text-gray-800">
        <div className="absolute inset-0 bg-white/5 opacity-20 bg-[url('/placeholder.svg?height=20&width=20')] bg-repeat"></div>
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Mentorship Platform – Your Path to Success</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Find jobs, migration support, mentors, and build your future with Guidex.
            </p>
            <div className="pt-6">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-6 h-auto"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Status Bar */}
      <StatusBar
        steps={[
          { id: "profile", label: "Profile Setup", status: "completed" },
          { id: "documents", label: "Document Upload", status: "current" },
          { id: "visa", label: "Visa Application", status: "upcoming" },
          { id: "job", label: "Job Search", status: "upcoming" },
          { id: "housing", label: "Housing", status: "upcoming" },
          { id: "integration", label: "Integration", status: "upcoming" },
        ]}
      />

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to navigate your migration journey and career path with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full border-green-100"
              >
                <div className="flex flex-col h-full">
                  <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 flex-grow">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple step-by-step process to help you achieve your goals.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-green-100 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-green-500 text-white w-12 h-12 flex items-center justify-center mb-4 shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Preview */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Job Opportunities in Lithuania</h2>
              <p className="text-gray-600">Find your next career move with our curated job listings.</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600 text-white">
              View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="service">Service</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {lithuaniaJobs.map((job, index) => (
                <Card
                  key={index}
                  className="p-6 rounded-2xl hover:shadow-md transition-all duration-200 border-green-100"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="rounded-lg bg-green-100 w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <job.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.company}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge variant="outline" className="rounded-full border-green-200">
                        {job.type}
                      </Badge>
                      <Badge variant="secondary" className="rounded-full bg-green-100 text-green-800">
                        €{job.salary}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        View Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="tech" className="space-y-4">
              <Card className="p-6 rounded-2xl">
                <p className="text-center text-gray-500">Showing Technology jobs in Lithuania...</p>
              </Card>
            </TabsContent>
            <TabsContent value="service" className="space-y-4">
              <Card className="p-6 rounded-2xl">
                <p className="text-center text-gray-500">Showing Service industry jobs in Lithuania...</p>
              </Card>
            </TabsContent>
            <TabsContent value="education" className="space-y-4">
              <Card className="p-6 rounded-2xl">
                <p className="text-center text-gray-500">Showing Education jobs in Lithuania...</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Community Callout */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-500 to-[#B0E0E6] text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-xl opacity-90 mb-6">
                Connect with fellow migrants, job seekers, and mentors. Share experiences, ask questions, and get the
                support you need.
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Join the Community
              </Button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 rounded-2xl">
                <MessageSquare className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Forums</h3>
                <p className="opacity-90">Discuss topics with peers and experts</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 rounded-2xl">
                <Globe className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                <p className="opacity-90">Connect with people worldwide</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 rounded-2xl">
                <BookOpen className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Resources</h3>
                <p className="opacity-90">Access guides and materials</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-6 rounded-2xl">
                <Bell className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Updates</h3>
                <p className="opacity-90">Stay informed on policy changes</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who have transformed their lives with Guidex.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl hover:shadow-md transition-all duration-300 border-green-100"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 text-green-500">
                    <Quote className="h-8 w-8" />
                  </div>
                  <p className="text-gray-700 mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center mt-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <img
                        src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                        alt={testimonial.name}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.nationality} • {testimonial.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Secure Document Management</h2>
              <p className="text-gray-600 mb-6">
                Keep all your important documents in one secure place. Get alerts for expiry dates and stay on top of
                your paperwork.
              </p>
              <ul className="space-y-3 mb-6">
                {["Secure encryption", "Expiry reminders", "Easy organization", "Quick retrieval"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <DocumentUpload />
            </div>
          </div>
        </div>
      </section>

      {/* Become a Mentor CTA */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-green-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Guide the Next Generation?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join Guidex as a mentor and help users succeed in their migration and career journeys. Share your expertise
            and make a difference.
          </p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            Become a Mentor
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Data
const features = [
  {
    title: "Personalized Mentorship",
    description: "Connect with experienced mentors who can guide you through your migration and career journey.",
    icon: BookOpen,
  },
  {
    title: "Visa & Migration Guide",
    description: "Access comprehensive guides and resources for visa applications and migration processes.",
    icon: Globe,
  },
  {
    title: "Job Search & Employer Match",
    description: "Find relevant job opportunities and get matched with employers looking for your skills.",
    icon: Briefcase,
  },
  {
    title: "Document Management",
    description: "Securely store and manage all your important documents in one place with expiry alerts.",
    icon: FileText,
  },
  {
    title: "Multilingual Support",
    description: "Get assistance in multiple languages to ensure clear communication and understanding.",
    icon: MessageSquare,
  },
  {
    title: "Real-time Notifications",
    description: "Stay updated with real-time alerts about your applications, documents, and opportunities.",
    icon: Bell,
  },
]

const steps = [
  {
    title: "Sign Up & Build Profile",
    description: "Create your account and complete your profile with your skills and goals.",
  },
  {
    title: "Explore Visa Options",
    description: "Research and compare visa options for your target country.",
  },
  {
    title: "Connect with Mentors",
    description: "Find and connect with mentors who can guide you through the process.",
  },
  {
    title: "Upload Documents",
    description: "Securely upload and manage your important documents.",
  },
  {
    title: "Get Real-time Alerts",
    description: "Receive notifications about deadlines, opportunities, and updates.",
  },
]

const lithuaniaJobs = [
  {
    title: "Customer Service Representative",
    company: "Baltic Services Group",
    location: "Vilnius, Lithuania",
    type: "Full-time",
    salary: "1200-1500",
    icon: Briefcase,
  },
  {
    title: "English Teacher",
    company: "International School of Kaunas",
    location: "Kaunas, Lithuania",
    type: "Full-time",
    salary: "1300-1600",
    icon: BookOpen,
  },
  {
    title: "IT Support Specialist",
    company: "Tech Solutions Lithuania",
    location: "Vilnius, Lithuania",
    type: "Full-time",
    salary: "1400-1800",
    icon: Globe,
  },
  {
    title: "Restaurant Staff",
    company: "Baltic Cuisine",
    location: "Klaipėda, Lithuania",
    type: "Part-time",
    salary: "800-1000",
    icon: Briefcase,
  },
]

const testimonials = [
  {
    quote:
      "Guidex helped me navigate the complex visa process and find a job in Lithuania. The mentorship was invaluable.",
    name: "Elena Petrova",
    nationality: "Russia",
    achievement: "Teacher in Vilnius",
  },
  {
    quote:
      "I was lost in paperwork until I found Guidex. Their document management system and reminders kept me on track.",
    name: "Carlos Mendoza",
    nationality: "Mexico",
    achievement: "IT Specialist in Kaunas",
  },
  {
    quote:
      "The mentors on Guidex provided insights that no website could. Their personal experiences made all the difference.",
    name: "Aisha Mohammed",
    nationality: "Nigeria",
    achievement: "Healthcare Professional in Vilnius",
  },
]

