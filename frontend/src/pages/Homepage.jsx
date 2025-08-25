import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  ArrowRight,
  Menu,
  X,
  ShoppingBag,
  Search,
} from "lucide-react";

// Using your actual asset paths
import s1 from "../assets/stories/s1.mp4";
import s2 from "../assets/stories/s2.mp4";
import s3 from "../assets/stories/s3.webp";
import t1 from "../assets/thumbnails/t1.png";
import t2 from "../assets/thumbnails/t2.jpg";
import bottleImg from "../assets/tumbler.png";
import HeaderUI from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import MobileBanner from "../components/MobileBanner";
import SuccessModal from "../components/OrderCompleteModal";

function Homepage() {
  const [playing, setPlaying] = useState(null);
  const videoRefs = useRef({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const stories = [
    {
      id: 1,
      src: s1,
      type: "video",
      name: "aarav._official",
      thumbnail: t1,
    },
    {
      id: 2,
      src: s2,
      type: "video",
      name: "mia.lens",
      thumbnail: t2,
    },
    {
      id: 3,
      src: s3,
      type: "image",
      name: "kabir.vibes",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-sans">
      {/* Header */}
      
      {/* Hero Banner - Only Black Section */}
      <div className="lg:flex hidden">
        <Banner />
      </div>

      <div className="flex lg:hidden">
        <MobileBanner />
      </div>

      {/* Product Showcase */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                DESIGNED
                <br />
                TO
                <br />
                PERFORM
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-base md:text-lg leading-relaxed">
                    24-hour cold. 12-hour hot. Zero compromise.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-base md:text-lg leading-relaxed">
                    BPA-free materials. Planet-friendly design.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                  <p className="text-base md:text-lg leading-relaxed">
                    Built for champions. Carried everywhere.
                  </p>
                </div>
              </div>

              <button className="bg-black text-white px-12 py-4 text-xl font-bold tracking-wide hover:bg-stone-800 cursor-pointer transition-all duration-300">
                SHOP NOW
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={bottleImg}
                alt="Verre Tumbler"
                className="max-w-full h-auto transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-16 leading-none">
              PROVEN
              <br />
              RESULTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8">
                <div className="text-5xl md:text-6xl font-black mb-4">2X</div>
                <p className="text-base md:text-lg opacity-70">Water Intake</p>
              </div>
              <div className="p-8">
                <div className="text-5xl md:text-6xl font-black mb-4">100%</div>
                <p className="text-base md:text-lg opacity-70">Better Focus</p>
              </div>
              <div className="p-8">
                <div className="text-5xl md:text-6xl font-black mb-4">95%</div>
                <p className="text-base md:text-lg opacity-70">Improved Skin</p>
              </div>
              <div className="p-8">
                <div className="text-5xl md:text-6xl font-black mb-4">∞</div>
                <p className="text-base md:text-lg opacity-70">Possibilities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={bottleImg}
                alt="Lifestyle"
                className="w-full h-auto transform"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-5xl md:text-6xl xl:text-8xl font-black tracking-tighter mb-12 leading-none">
                ANYWHERE
                <br />
                ANYTIME
              </h2>
              <p className="text-lg md:text-xl mb-12 opacity-80">
                From morning workouts to late-night sessions. Your perfect
                hydration companion.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-1 bg-black" />
                  <span className="text-lg md:text-xl font-medium">GYM SESSIONS</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-1 bg-black" />
                  <span className="text-lg md:text-xl font-medium">OFFICE MEETINGS</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-1 bg-black" />
                  <span className="text-lg md:text-xl font-medium">TRAVEL ADVENTURES</span>
                </div>
              </div>

              <button className="bg-black text-white px-12 py-4 text-xl font-bold tracking-wide hover:bg-stone-800 cursor-pointer transition-all duration-300">
                GRAB YOURS
              </button>
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
            SIP?
          </h2>
          <p className="text-lg md:text-xl mb-12 opacity-80">
            Join thousands who've transformed their hydration game.
          </p>
          <button className="bg-white text-black px-12 py-4 text-xl font-bold tracking-wide hover:bg-gray-200 transition-all duration-300 cursor-pointer">
            GET STARTED
          </button>
        </div>
      </section>

      <SuccessModal />

      {/* Footer */}
    </div>
  );
}

export default Homepage;