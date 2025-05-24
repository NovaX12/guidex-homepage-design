import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CGV() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Terms and Conditions (CGV)</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>General Terms and Conditions of Use</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
                  <p className="text-gray-700">
                    By accessing and using the Altroway platform, you accept and agree to be bound by the terms and
                    provision of this agreement.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">2. Service Description</h3>
                  <p className="text-gray-700">
                    Altroway provides migration guidance, job placement services, and legal support for individuals
                    seeking to migrate within Europe. Our services include:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Personalized migration guidance</li>
                    <li>Job opportunity listings and matching</li>
                    <li>Legal support and document assistance</li>
                    <li>Community support and networking</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">3. User Responsibilities</h3>
                  <p className="text-gray-700">Users are responsible for:</p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Providing accurate and truthful information</li>
                    <li>Maintaining the confidentiality of their account credentials</li>
                    <li>Complying with all applicable laws and regulations</li>
                    <li>Respecting the rights of other users</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">4. Privacy and Data Protection</h3>
                  <p className="text-gray-700">
                    We are committed to protecting your privacy and personal data in accordance with GDPR and applicable
                    data protection laws. Please refer to our Privacy Policy for detailed information about how we
                    collect, use, and protect your data.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">5. Payment Terms</h3>
                  <p className="text-gray-700">
                    Premium services require payment as specified on our platform. All payments are processed securely,
                    and refunds are subject to our refund policy.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">6. Limitation of Liability</h3>
                  <p className="text-gray-700">
                    Altroway provides information and guidance services. We are not responsible for the outcome of visa
                    applications, job applications, or any decisions made by immigration authorities or employers. Users
                    are advised to verify all information independently.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">7. Intellectual Property</h3>
                  <p className="text-gray-700">
                    All content on the Altroway platform, including text, graphics, logos, and software, is the property
                    of Altroway and is protected by copyright and other intellectual property laws.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">8. Termination</h3>
                  <p className="text-gray-700">
                    We reserve the right to terminate or suspend access to our services at any time, without prior
                    notice, for conduct that we believe violates these terms or is harmful to other users.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">9. Changes to Terms</h3>
                  <p className="text-gray-700">
                    We reserve the right to modify these terms at any time. Users will be notified of significant
                    changes, and continued use of the platform constitutes acceptance of the modified terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">10. Contact Information</h3>
                  <p className="text-gray-700">For questions about these terms, please contact us at:</p>
                  <div className="mt-2 text-gray-700">
                    <p>Email: legal@altroway.com</p>
                    <p>Phone: +370 6123 4567</p>
                    <p>Address: Gedimino pr. 9, Vilnius, Lithuania, LT-01103</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
