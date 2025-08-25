import React, { useEffect, useState } from "react";
import prodImg from "../assets/prod.png";
import e1 from "../assets/e1.png";
import e2 from "../assets/e2.png";
import e3 from "../assets/e3.png";
import e4 from "../assets/e4.png";
import bg from "../assets/bg.png";

function MobileBanner() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero-section relative w-full max-h-[90vh] md:max-h-[90vh] bg-white overflow-hidden">
      {/* Background Image - Static and Centered */}
        {/* <img
        src={bg}
        // style={{objectFit:''}}
        className="absolute bottom-0 h-[60vh] left-1/2 transform -translate-x-1/2 z-0 opacity-80"
        alt=""
      /> */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-[70px] md:pt-[100px] w-full h-full px-4 text-center">
        {/* Hero Heading */}
        <div className="mb-6 relative">
          <h1
          style={{fontFamily:'heading'}}
            className="text-5xl sm:text-6xl md:text-7xl font-[h] font-bold uppercase tracking-tight leading-[0.8] text-[#000] relative px-2"
          >
            Flavor from
          </h1>
          <h2
          style={{fontFamily:'heading'}}
            className="text-5xl sm:text-6xl md:text-7xl font-[h] font-bold uppercase leading-[0.8] text-[#000] relative px-2"
          >
            thin air
          </h2>
        </div>

        {/* Product Image with Simple Parallax */}
        <div className="flex relative -translate-y-4">
          <div className="relative">
            {/* Simple glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-[#4a9d8e] to-transparent opacity-15 blur-2xl scale-125 rounded-full" />
            
            <img
              src={prodImg}
              alt="Verre Sipper"
              className="w-[270px] md:w-[300px] rotate-[4deg] object-contain relative z-10"
              style={{
                transform: `translateY(${-offset * 0.1}px)`,
                filter: 'drop-shadow(0 12px 25px rgba(20, 56, 51, 0.25))'
              }}
            />
          </div>

          {/* Floating elements with minimal effects */}
          <img
            src={e1}
            alt="Element 1"
            className="w-[90px] top-[90px] -left-12 object-contain absolute z-20"
            style={{
              transform: `translateY(${-offset * 0.12}px) scale(${1 + Math.sin(Date.now() / 2500) * 0.02})`,
            }}
          />
          
          <img
            src={e2}
            alt="Element 2"
            className="w-[90px] bottom-[30px] -left-10 object-contain absolute z-20"
            style={{
              transform: `translateY(${-offset * 0.08}px) scale(${1 + Math.sin(Date.now() / 3000 + 1) * 0.015})`,
            }}
          />
          
          <img
            src={e4}
            alt="Element 4"
            className="w-[75px] top-[80px] -right-10 object-contain absolute z-20"
            style={{
              transform: `translateY(${-offset * 0.15}px) scale(${1 + Math.sin(Date.now() / 2200 + 2) * 0.025})`,
            }}
          />
          
          <img
            src={e3}
            alt="Element 3"
            className="w-[90px] top-[240px] -right-10 object-contain absolute z-20"
            style={{
              transform: `translateY(${-offset * 0.06}px) scale(${1 + Math.sin(Date.now() / 3500 + 3) * 0.018})`,
            }}
          />
        </div>

       <button 
          style={{
            // fontFamily: "heading",

          }}
          className="sticky bottom-5 uppercase font-bold cursor-pointer text-xl px-12 py-4 transition-all duration-300 shadow-lg hover:shadow-xl  bg-black text-white tracking-tight hover:scale-105"
        
        >
          Grab yours
        </button>   
      </div>

      {/* Mobile-optimized CSS */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        /* Optimize for mobile performance */
        * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Use dynamic viewport height for mobile browsers */
        .hero-section {
          height: 100vh;
          height: 100dvh;
        }

        /* Reduce motion for battery life */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default MobileBanner;