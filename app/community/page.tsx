import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Globe, BookOpen, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Community() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with fellow migrants, job seekers, and mentors. Share experiences, ask questions, and get the
              support you need.
            </p>
          </section>

          {/* Community Stats */}
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-green-100">
                <CardHeader>
                  <div className="mx-auto rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold">5,000+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Active Members</p>
                </CardContent>
              </Card>

              <Card className="text-center border-green-100">
                <CardHeader>
                  <div className="mx-auto rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-2">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold">50+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Countries Represented</p>
                </CardContent>
              </Card>

              <Card className="text-center border-green-100">
                <CardHeader>
                  <div className="mx-auto rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-2">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold">10,000+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Questions Answered</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Community Topics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityTopics.map((topic, index) => (
                <Card key={index} className="border-green-100 hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-green-100 w-10 h-10 flex items-center justify-center">
                        <topic.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <Badge variant="outline" className="border-green-200">
                        {topic.posts} posts
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
                      View Discussions <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Join CTA */}
          <section className="py-12 px-6 bg-gradient-to-br from-green-500 to-[#B0E0E6] rounded-2xl text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Conversation?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Create an account to participate in discussions, ask questions, and connect with others on similar
              journeys.
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Join the Community
            </Button>
          </section>

          {/* Upcoming Events */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming Community Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <Card key={index} className="border-green-100">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="mt-1">{event.date}</CardDescription>
                      </div>
                      <Badge className={event.virtual ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                        {event.virtual ? "Virtual" : "In Person"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-gray-500">{event.attendees} attending</span>
                    <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

const communityTopics = [
  {
    title: "Visa Questions",
    description: "Get help with visa applications, requirements, and processes",
    icon: Globe,
    posts: 324,
  },
  {
    title: "Job Search Help",
    description: "Tips, resources, and support for finding employment",
    icon: BookOpen,
    posts: 256,
  },
  {
    title: "Housing & Accommodation",
    description: "Find information about housing options and neighborhoods",
    icon: Users,
    posts: 189,
  },
  {
    title: "Language Learning",
    description: "Resources and tips for learning Lithuanian and other languages",
    icon: MessageSquare,
    posts: 215,
  },
  {
    title: "Cultural Integration",
    description: "Advice on adapting to Lithuanian culture and customs",
    icon: Globe,
    posts: 178,
  },
  {
    title: "General Advice",
    description: "General questions and discussions about life in Lithuania",
    icon: MessageSquare,
    posts: 412,
  },
]

const events = [
  {
    title: "Newcomers Welcome Session",
    date: "June 15, 2023 • 18:00",
    description: "A virtual welcome session for new community members to learn about resources and meet others.",
    attendees: 42,
    virtual: true,
  },
  {
    title: "Networking Mixer in Vilnius",
    date: "June 22, 2023 • 19:00",
    description: "Join us for an evening of networking with professionals and newcomers in Vilnius.",
    attendees: 28,
    virtual: false,
  },
]
