import React from "react";
import HeaderUI from "../components/Header";
import Footer from "../components/Footer";

function Privacy() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans">
      <HeaderUI />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              PRIVACY
              <br />
              POLICY
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-4xl mx-auto">
              Your privacy matters to us. Here's how we protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Privacy Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            {/* Information We Collect */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                WHAT WE
                <br />
                COLLECT
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We only collect the information necessary to process your orders and provide excellent service.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Personal Information:</strong> Name, email address, and shipping address
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Order Details:</strong> Product selections, payment information, and delivery preferences
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Communication:</strong> Customer service inquiries and support requests
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Website Usage:</strong> Basic analytics to improve your experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why We Collect */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                WHY WE
                <br />
                COLLECT IT
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  Every piece of information we collect serves a specific purpose to enhance your experience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Order Processing:</strong> To fulfill your orders and deliver products to your door
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Customer Service:</strong> To provide personalized support and resolve any issues
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Product Improvement:</strong> To understand your needs and enhance our products
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Legal Compliance:</strong> To meet regulatory requirements and protect both parties
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Protect */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                HOW WE
                <br />
                PROTECT IT
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We implement industry-standard security measures to keep your information safe and secure.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Encryption:</strong> All data is encrypted during transmission and storage
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Secure Servers:</strong> Hosted on secure, monitored servers with regular backups
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Access Control:</strong> Limited access to personal information by authorized personnel only
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Regular Audits:</strong> Security assessments and updates to maintain protection standards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Razorpay Payment Processing */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                PAYMENT
                <br />
                PROCESSING
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We use Razorpay, a trusted payment processor, to handle all financial transactions securely.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Secure Processing:</strong> Razorpay handles all payment information with bank-level security
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>PCI Compliance:</strong> Meets Payment Card Industry Data Security Standards
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Privacy Policy:</strong> Razorpay has their own privacy policy for payment data
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>No Storage:</strong> We never store your payment card information on our servers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                WE DON'T
                <br />
                SELL DATA
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  Your personal information is valuable and private. We're committed to keeping it that way.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>No Third-Party Sales:</strong> We never sell, rent, or trade your personal information
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Limited Sharing:</strong> Only share information with shipping partners to deliver your orders
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Legal Requirements:</strong> May share information if required by law or to protect rights
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Your Control:</strong> You always have control over your information and can request changes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                COOKIE
                <br />
                NOTICE
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We use cookies to enhance your browsing experience and improve our website functionality.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Essential Cookies:</strong> Required for basic website functionality and security
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Analytics Cookies:</strong> Help us understand how visitors use our website
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Preference Cookies:</strong> Remember your settings and preferences for future visits
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Control:</strong> You can manage cookie preferences through your browser settings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Communications */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                EMAIL
                <br />
                COMMUNICATIONS
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We send emails to keep you informed about your orders and important updates.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Order Updates:</strong> Confirmation, shipping, and delivery notifications
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Customer Service:</strong> Responses to your inquiries and support requests
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Marketing (Optional):</strong> Product updates and promotions - you can unsubscribe anytime
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Unsubscribe:</strong> Every marketing email includes an easy unsubscribe link
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                YOUR
                <br />
                RIGHTS
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  You have control over your personal information and can exercise these rights at any time.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Access:</strong> Request a copy of the personal information we have about you
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Update:</strong> Correct or update your information if it's inaccurate
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Delete:</strong> Request deletion of your personal information (with some limitations)
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Contact:</strong> Reach out to us at info@verre.com to exercise any of these rights
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
            PRIVACY
            <br />
            QUESTIONS?
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-80">
            We're transparent about our privacy practices. Contact us with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@verre.com"
              className="bg-white text-black px-12 py-4 text-xl font-bold tracking-wide hover:bg-gray-200 transition-all duration-300 cursor-pointer"
            >
              EMAIL US
            </a>
            <a 
              href="/contact-us"
              className="bg-transparent text-white border-2 border-white px-12 py-4 text-xl font-bold tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              CONTACT PAGE
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Privacy;
