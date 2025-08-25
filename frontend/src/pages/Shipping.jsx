import React from "react";
import HeaderUI from "../components/Header";
import Footer from "../components/Footer";

function Shipping() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans">

      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              SHIPPING &
              <br />
              DELIVERY
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-4xl mx-auto">
              Fast, reliable delivery to get your premium sippers to you quickly and safely.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Methods Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                SHIPPING
                <br />
                METHODS
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-black mb-4 tracking-tight">STANDARD SHIPPING</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Delivery Time</span>
                      <span className="text-lg font-bold">3-5 Business Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Cost</span>
                      <span className="text-lg font-bold">₹99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Free Over</span>
                      <span className="text-lg font-bold">₹999</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-black mb-4 tracking-tight">EXPRESS SHIPPING</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Delivery Time</span>
                      <span className="text-lg font-bold">1-2 Business Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Cost</span>
                      <span className="text-lg font-bold">₹199</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Free Over</span>
                      <span className="text-lg font-bold">₹1,499</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-12 rounded-lg">
              <h3 className="text-3xl font-black mb-6 tracking-tight">PROCESSING TIME</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Order Confirmation</h4>
                    <p className="text-lg opacity-90">Within 2 hours of payment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Processing</h4>
                    <p className="text-lg opacity-90">1-2 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Shipping</h4>
                    <p className="text-lg opacity-90">Same day if ordered before 2 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Timeframes Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              DELIVERY
              <br />
              TIMEFRAMES
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Estimated delivery times by location and shipping method.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-black mb-4 tracking-tight">METRO CITIES</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2">1-2</div>
                  <p className="text-lg opacity-80">Business Days</p>
                </div>
                <p className="text-sm opacity-70">Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-black mb-4 tracking-tight">TIER 2 CITIES</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2">2-3</div>
                  <p className="text-lg opacity-80">Business Days</p>
                </div>
                <p className="text-sm opacity-70">Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-black mb-4 tracking-tight">OTHER LOCATIONS</h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-4xl font-black mb-2">3-5</div>
                  <p className="text-lg opacity-80">Business Days</p>
                </div>
                <p className="text-sm opacity-70">Smaller cities and rural areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging & Tracking Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                PACKAGING
                <br />
                DETAILS
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    <strong>Protective Packaging:</strong> Bubble wrap and secure boxes to prevent damage
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    <strong>Product Safety:</strong> Each sipper individually wrapped and secured
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    <strong>Eco-Friendly:</strong> Recyclable packaging materials whenever possible
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    <strong>Branded Elements:</strong> Verre logo and care instructions included
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white text-black p-12 rounded-lg">
              <h3 className="text-3xl font-black mb-6 tracking-tight">TRACKING INFORMATION</h3>
              <div className="space-y-4">
                <p className="text-lg opacity-80 mb-6">
                  Track your order from our warehouse to your doorstep with real-time updates.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-sm font-medium">Order Confirmation Email</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-sm font-medium">Shipping Notification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-sm font-medium">Tracking Number</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-sm font-medium">Delivery Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address Requirements Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                ADDRESS
                <br />
                REQUIREMENTS
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Complete Address:</strong> Street number, building name, apartment/unit number
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Landmarks:</strong> Nearby landmarks or reference points for easier delivery
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Contact Number:</strong> Valid phone number for delivery coordination
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Pincode:</strong> Accurate postal code for proper routing
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-black mb-6 tracking-tight">DELIVERY ATTEMPT POLICY</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>First Attempt:</strong> During business hours (9 AM - 6 PM)
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Second Attempt:</strong> Next business day if first attempt fails
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Return to Sender:</strong> After two failed delivery attempts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lost & Damaged Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                LOST OR
                <br />
                DAMAGED
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Immediate Action:</strong> Contact us within 24 hours of delivery
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Documentation:</strong> Take photos of damaged packaging and products
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Replacement:</strong> We'll ship a replacement at no additional cost
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-80">
                    <strong>Investigation:</strong> We work with courier partners to prevent future issues
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-black mb-6 tracking-tight">INTERNATIONAL SHIPPING</h3>
              <div className="space-y-4">
                <p className="text-lg opacity-80 mb-6">
                  Currently available to select international destinations with extended delivery times.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-sm font-medium">Canada: 7-10 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-sm font-medium">UK: 8-12 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="text-sm font-medium">Australia: 10-15 business days</span>
                  </div>
                </div>
                <p className="text-sm opacity-70 mt-4">
                  * International shipping costs and customs duties apply
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
            SHIPPING
            <br />
            QUESTIONS?
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-80">
            Our logistics team is here to help with any shipping or delivery concerns.
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

export default Shipping;

