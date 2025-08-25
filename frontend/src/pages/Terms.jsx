import React from "react";
import HeaderUI from "../components/Header";
import Footer from "../components/Footer";

function Terms() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans">

      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              TERMS &
              <br />
              CONDITIONS
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-4xl mx-auto">
              Simple, transparent terms for a straightforward shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Terms Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            {/* Product Information */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                PRODUCTS & WARRANTY
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  All Verre products are crafted with premium materials and undergo rigorous quality testing. 
                  We stand behind our products with confidence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Warranty:</strong> 1-year limited warranty against manufacturing defects
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Materials:</strong> BPA-free, food-grade stainless steel construction
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Performance:</strong> 24-hour cold retention, 12-hour hot retention
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Processing */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                ORDER PROCESSING
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We process orders quickly and efficiently to get your products to you as soon as possible.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Processing Time:</strong> 1-2 business days for order confirmation and shipping
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Order Confirmation:</strong> You'll receive an email confirmation with order details
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Shipping Notification:</strong> Tracking information sent once your order ships
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                PAYMENT & SECURITY
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We use Razorpay for secure, reliable payment processing to ensure your financial information is protected.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Payment Methods:</strong> Credit/debit cards, UPI, net banking, and digital wallets
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Security:</strong> PCI DSS compliant payment processing with end-to-end encryption
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Currency:</strong> All prices displayed in Indian Rupees (₹)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Website Usage */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                WEBSITE USAGE
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  By using our website, you agree to these simple terms and conditions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Age Requirement:</strong> You must be 18 or older to place orders
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Account Responsibility:</strong> Keep your account information secure and accurate
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Prohibited Use:</strong> No unauthorized access or misuse of our website
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Terms */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                DELIVERY & SHIPPING
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We deliver to most locations across India with reliable shipping partners.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Delivery Areas:</strong> Nationwide delivery to all major cities and towns
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Address Accuracy:</strong> Ensure your delivery address is complete and correct
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Delivery Attempts:</strong> We'll attempt delivery twice before returning to sender
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                DISPUTE RESOLUTION
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We believe in resolving issues amicably and quickly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>First Step:</strong> Contact our customer support team for any issues
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Response Time:</strong> We aim to respond to all inquiries within 24 hours
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Payment Disputes:</strong> Razorpay handles payment-related disputes and refunds
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                LIMITATION OF LIABILITY
              </h2>
              <div className="bg-white p-8 rounded-lg">
                <p className="text-lg opacity-80 mb-6">
                  We're committed to providing quality products, but there are some limitations to consider.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Product Use:</strong> Products are designed for intended use only
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Maximum Liability:</strong> Limited to the purchase price of the product
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                    <p className="text-lg opacity-80">
                      <strong>Indirect Damages:</strong> We're not liable for indirect or consequential damages
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
            QUESTIONS
            <br />
            ABOUT TERMS?
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-80">
            Our team is here to clarify any terms or conditions. Reach out anytime.
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


    </div>
  );
}

export default Terms;

