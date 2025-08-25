import React from "react";


function Contact() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans">
   
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              GET IN
              <br />
              TOUCH
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-4xl mx-auto">
              We're here to help with any questions about our products or your order.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                CONTACT
                <br />
                DETAILS
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 tracking-tight">ADDRESS</h3>
                    <p className="text-lg opacity-80">
                      123 Business Street<br />
                      City, State 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 tracking-tight">EMAIL</h3>
                    <p className="text-lg opacity-80">
                      <a href="mailto:info@verre.com" className="hover:opacity-70 transition-opacity">
                        info@verre.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 tracking-tight">PHONE</h3>
                    <p className="text-lg opacity-80">
                      <a href="tel:+15551234567" className="hover:opacity-70 transition-opacity">
                        +1 (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-12 rounded-lg">
              <h3 className="text-3xl font-black mb-6 tracking-tight">BUSINESS HOURS</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-lg">Monday - Friday</span>
                  <span className="text-lg font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg">Saturday</span>
                  <span className="text-lg font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg">Sunday</span>
                  <span className="text-lg font-medium">Closed</span>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-xl font-black mb-4 tracking-tight">CUSTOMER SUPPORT</h4>
                <p className="text-lg opacity-90 mb-4">
                  Our support team is available during business hours to assist with:
                </p>
                <ul className="space-y-2 text-lg opacity-90">
                  <li>• Product inquiries</li>
                  <li>• Order status</li>
                  <li>• Technical support</li>
                  <li>• General questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              FREQUENTLY
              <br />
              ASKED
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Quick answers to common questions about our sippers and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">How long does shipping take?</h3>
                <p className="text-lg opacity-80">
                  Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">Are your products BPA-free?</h3>
                <p className="text-lg opacity-80">
                  Yes! All Verre products are made with BPA-free, food-grade stainless steel for your safety and peace of mind.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">What's your return policy?</h3>
                <p className="text-lg opacity-80">
                  We offer a 30-day satisfaction guarantee. If you're not completely satisfied, contact us for a replacement or refund.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">How do I clean my sipper?</h3>
                <p className="text-lg opacity-80">
                  Hand wash with warm soapy water. For deep cleaning, use a bottle brush and mild detergent. Dishwasher safe on top rack.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">Do you ship internationally?</h3>
                <p className="text-lg opacity-80">
                  Currently, we ship to the United States and Canada. International shipping will be available soon!
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">Can I track my order?</h3>
                <p className="text-lg opacity-80">
                  Absolutely! You'll receive a tracking number via email once your order ships, so you can monitor its journey to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              FOLLOW
              <br />
              US
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Stay connected for product updates, hydration tips, and behind-the-scenes content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-black text-3xl font-black">I</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">INSTAGRAM</h3>
              <p className="text-lg opacity-80 mb-6">
                Daily inspiration and product showcases
              </p>
              <a 
                href="https://instagram.com/verre_brand" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-8 py-3 font-bold tracking-wide hover:bg-gray-200 transition-all duration-300"
              >
                FOLLOW
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-black text-3xl font-black">F</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">FACEBOOK</h3>
              <p className="text-lg opacity-80 mb-6">
                Community updates and customer stories
              </p>
              <a 
                href="#" 
                className="inline-block bg-white text-black px-8 py-3 font-bold tracking-wide hover:bg-gray-200 transition-all duration-300"
              >
                FOLLOW
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-black text-3xl font-black">T</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">TWITTER</h3>
              <p className="text-lg opacity-80 mb-6">
                Quick updates and industry insights
              </p>
              <a 
                href="#" 
                className="inline-block bg-white text-black px-8 py-3 font-bold tracking-wide hover:bg-gray-200 transition-all duration-300"
              >
                FOLLOW
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
            STILL HAVE
            <br />
            QUESTIONS?
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-80">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@verre.com"
              className="bg-black text-white px-12 py-4 text-xl font-bold tracking-wide hover:bg-stone-800 transition-all duration-300 cursor-pointer"
            >
              EMAIL US
            </a>
            <a 
              href="tel:+15551234567"
              className="bg-white text-black border-2 border-black px-12 py-4 text-xl font-bold tracking-wide hover:bg-gray-100 transition-all duration-300 cursor-pointer"
            >
              CALL US
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}

export default Contact;

