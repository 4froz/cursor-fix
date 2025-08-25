import React from "react";
import HeaderUI from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans">
      
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              OUR
              <br />
              STORY
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-4xl mx-auto">
              Born from a simple belief: everyone deserves premium hydration without compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                WHY WE
                <br />
                STARTED
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-80">
                In a world filled with disposable plastic and mediocre hydration solutions, 
                we saw an opportunity to create something extraordinary.
              </p>
              <p className="text-lg md:text-xl opacity-80">
                Verre was born from frustration with products that promised performance 
                but delivered disappointment. We decided to change that.
              </p>
            </div>
            <div className="bg-black text-white p-12 rounded-lg">
              <h3 className="text-3xl font-black mb-6 tracking-tight">OUR MISSION</h3>
              <p className="text-lg opacity-90">
                To revolutionize hydration through innovative design, premium materials, 
                and uncompromising quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              OUR
              <br />
              VALUES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-black">H</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">HEALTH</h3>
              <p className="text-lg opacity-80">
                Promoting wellness through better hydration habits and BPA-free materials.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-black">S</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">SUSTAINABILITY</h3>
              <p className="text-lg opacity-80">
                Reducing single-use plastic waste with durable, long-lasting products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-black">I</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">INNOVATION</h3>
              <p className="text-lg opacity-80">
                Continuously pushing boundaries in design, materials, and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                QUALITY
                <br />
                STANDARDS
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    BPA-free, food-grade stainless steel construction
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    24-hour cold retention, 12-hour hot retention
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    Drop-resistant design with premium finish
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0" />
                  <p className="text-lg opacity-90">
                    Rigorous testing for durability and performance
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white text-black p-12 rounded-lg">
              <h3 className="text-3xl font-black mb-6 tracking-tight">MANUFACTURING</h3>
              <p className="text-lg opacity-80 mb-6">
                Every Verre product undergoes strict quality control processes, 
                from material selection to final inspection.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-black rounded-full" />
                  <span className="text-sm font-medium">Material Testing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-black rounded-full" />
                  <span className="text-sm font-medium">Performance Validation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-black rounded-full" />
                  <span className="text-sm font-medium">Final Quality Check</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
              MEET THE
              <br />
              TEAM
            </h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Passionate individuals dedicated to revolutionizing your hydration experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl font-black">A</span>
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">ALEX CHEN</h3>
              <p className="text-lg opacity-70 mb-3">Founder & CEO</p>
              <p className="text-base opacity-80">
                Former product designer with a passion for sustainable solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl font-black">S</span>
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">SARAH KIM</h3>
              <p className="text-lg opacity-70 mb-3">Head of Design</p>
              <p className="text-base opacity-80">
                Award-winning industrial designer focused on user experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl font-black">M</span>
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight">MIKE RODRIGUEZ</h3>
              <p className="text-lg opacity-70 mb-3">Operations Lead</p>
              <p className="text-base opacity-80">
                Supply chain expert ensuring quality at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
            READY TO
            <br />
            JOIN US?
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-80">
            Experience the difference that premium hydration makes.
          </p>
          <button className="bg-white text-black px-12 py-4 text-xl font-bold tracking-wide hover:bg-gray-200 transition-all duration-300 cursor-pointer">
            SHOP NOW
          </button>
        </div>
      </section>

      
    </div>
  );
}

export default About;
