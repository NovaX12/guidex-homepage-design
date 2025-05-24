import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Briefcase, FileText, Quote, Star } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-400 via-green-300 to-[#B0E0E6] text-gray-800">
        <div className="absolute inset-0 bg-white/5 opacity-20 bg-[url('/placeholder.svg?height=20&width=20')] bg-repeat"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Altroway
                <span className="block text-2xl md:text-3xl font-normal mt-2">shortcut to your future</span>
              </h1>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">742</div>
                  <div className="text-sm">Successful employees</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">67</div>
                  <div className="text-sm">Active employers</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">9</div>
                  <div className="text-sm">Possible destinations</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm">Legal partners</div>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-6 h-auto"
                  >
                    Your journey begins here
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Europe Map */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Available Destinations</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    "Germany",
                    "Lithuania",
                    "Latvia",
                    "Poland",
                    "Czech Republic",
                    "Slovenia",
                    "Slovakia",
                    "Hungary",
                    "Croatia",
                    "Romania",
                  ].map((country, index) => (
                    <div key={index} className="bg-white/20 rounded-lg p-2 text-center">
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-green-100 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 text-green-500">
                    <Quote className="h-8 w-8 mx-auto" />
                  </div>
                  <p className="text-gray-700 mb-4 font-medium">{testimonial.quote}</p>
                  <p className="text-green-600 font-semibold">– {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for your migration journey in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/guides">
              <Card className="border-green-100 hover:shadow-md transition-all duration-300 h-full group">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Guides</h3>
                  <p className="text-gray-600 mb-4">
                    Personalized migration guides based on your profile and destination.
                  </p>
                  <span className="text-green-600 group-hover:underline flex items-center justify-center">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/jobs">
              <Card className="border-green-100 hover:shadow-md transition-all duration-300 h-full group">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Jobs</h3>
                  <p className="text-gray-600 mb-4">
                    Find job opportunities across Europe with detailed salary and terms information.
                  </p>
                  <span className="text-green-600 group-hover:underline flex items-center justify-center">
                    Browse Jobs <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link href="/legal-support">
              <Card className="border-green-100 hover:shadow-md transition-all duration-300 h-full group">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Legal Support</h3>
                  <p className="text-gray-600 mb-4">
                    Get assistance with visa applications, residence permits, and migration issues.
                  </p>
                  <span className="text-green-600 group-hover:underline flex items-center justify-center">
                    Get Help <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Service CTA */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-500 to-[#B0E0E6] text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 mr-2" />
            <h2 className="text-3xl font-bold">PREMIUM</h2>
          </div>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Individual guide based on your qualification, experience, language knowledge + documentation + post arrival
            guide providing best individual option
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            Upgrade to Premium
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const testimonials = [
  { quote: "Comfortable and easy", name: "Maneesh" },
  { quote: "it's something special. I can confidently say it stands apart", name: "Moses" },
  { quote: "Time saving", name: "Rolando" },
  { quote: "No investments needed", name: "Masimba" },
  { quote: "Right choice", name: "Bilal" },
  { quote: "Everything in one place", name: "Mandeep" },
]
