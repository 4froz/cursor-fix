import React, { useEffect, useState } from "react";
import prodImg from "../assets/prod.png";
import e1 from "../assets/e1.png";
import e2 from "../assets/e2.png";
import e3 from "../assets/e3.png";
import e4 from "../assets/e4.png";
import bg from "../assets/bg.png";

function Banner() {
  const [offset, setOffset] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Disable mouse effects on mobile/touch devices
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
          y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Set loaded to true immediately - no entrance animations
    setIsLoaded(true);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.querySelector(".hero-section");
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setIsHeroVisible(rect.bottom > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hero-section h-[100vh] relative w-full bg-white overflow-hidden">
      {/* Background Image - Static and Centered */}
      <img
        src={bg}
        className="absolute hidden xl:block bottom-0 blur-md left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] z-0 opacity-80"
        alt=""
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 text-center pt-[60px] sm:pt-[100px]">
        {/* Hero Heading with Staggered Animation */}
        <div className="mb-4 sm:mb-8 relative">
          {/* Decorative elements behind text - hidden on small mobile */}
          {!isMobile && (
            <>
              <div 
                className="absolute -top-8 -left-8 w-16 h-16 rounded-full opacity-20 blur-xl"
                style={{
                  background: `linear-gradient(135deg, var(--brand-primary), var(--brand-light))`,
                  transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                  transition: "transform 0.3s ease-out"
                }}
              />
              <div 
                className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full opacity-15 blur-xl"
                style={{
                  background: `linear-gradient(135deg, var(--secondary-teal), var(--brand-primary))`,
                  transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
                  transition: "transform 0.3s ease-out"
                }}
              />
            </>
          )}

          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[108px] font-bold uppercase tracking-tight leading-none relative px-2"
            style={{ 
              lineHeight: 0.8,
              color: "#000"
            }}
          >
            <span className="relative font-black tracking-tighter leading-none ">
              Flavor from
            </span>
          </h1>
          <h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-[104px] font-bold uppercase relative px-2"
            style={{ 
              lineHeight: 0.8,
              color: "#000"
            }}
          >
            <span className="relative font-black tracking-tighter leading-none">
              thin air
            </span>
          </h2>
        </div>

        {/* Product Image with Enhanced Parallax and Floating Animation */}
        <div 
          className="flex -translate-y-[20px] sm:-translate-y-[50px] lg:-translate-y-[100px] relative"
        >
          <div className="relative">
            <img
              src={prodImg}
              alt="Verre Sipper"
              className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[400px] rotate-[4deg] object-contain relative z-10 drop-shadow-2xl"
              style={{
                transform: isMobile 
                  ? `translateY(${-offset * 0.1}px) rotate(4deg)`
                  : `translateY(${-offset * 0.2}px) rotate(${4 + mousePosition.x * 2}deg) scale(${1 + Math.sin(Date.now() / 3000) * 0.02})`,
                transition: "transform 0.3s ease-out",
                filter: `drop-shadow(0 15px 35px rgba(20, 56, 51, 0.3))`
              }}
            />
          </div>

          {/* Enhanced floating elements with different parallax speeds */}
          <img
            src={e1}
            alt="Element 1"
            className="w-[80px] sm:w-[120px] lg:w-[150px] top-[80px] sm:top-[120px] lg:top-[150px] -left-8 sm:-left-16 lg:-left-20 object-contain absolute z-20 drop-shadow-lg"
            style={{
              transform: isMobile
                ? `translateY(${-offset * 0.15}px) scale(${1 + Math.sin(Date.now() / 2000) * 0.02})`
                : `translateY(${-offset * 0.3}px) translateX(${mousePosition.x * 10}px) rotate(${mousePosition.x * 5}deg) scale(${1 + Math.sin(Date.now() / 2000) * 0.05})`,
              transition: "transform 0.2s ease-out"
            }}
          />
          
          <img
            src={e2}
            alt="Element 2"
            className="w-[80px] sm:w-[120px] lg:w-[150px] bottom-[20px] sm:bottom-[40px] lg:bottom-[50px] -left-8 sm:-left-16 lg:-left-20 object-contain absolute z-20 drop-shadow-lg"
            style={{
              transform: isMobile
                ? `translateY(${-offset * 0.12}px) scale(${1 + Math.sin(Date.now() / 2500 + 1) * 0.02})`
                : `translateY(${-offset * 0.25}px) translateX(${mousePosition.x * -8}px) rotate(${mousePosition.y * -3}deg) scale(${1 + Math.sin(Date.now() / 2500 + 1) * 0.04})`,
              transition: "transform 0.2s ease-out"
            }}
          />
          
          <img
            src={e4}
            alt="Element 4"
            className="w-[70px] sm:w-[100px] lg:w-[120px] top-[70px] sm:top-[100px] lg:top-[120px] -right-4 sm:-right-8 lg:-right-10 object-contain absolute z-20 drop-shadow-lg"
            style={{
              transform: isMobile
                ? `translateY(${-offset * 0.18}px) scale(${1 + Math.sin(Date.now() / 1800 + 2) * 0.03})`
                : `translateY(${-offset * 0.35}px) translateX(${mousePosition.x * -12}px) rotate(${mousePosition.x * -4}deg) scale(${1 + Math.sin(Date.now() / 1800 + 2) * 0.06})`,
              transition: "transform 0.2s ease-out"
            }}
          />
          
          <img
            src={e3}
            alt="Element 3"
            className="w-[80px] sm:w-[120px] lg:w-[150px] top-[200px] sm:top-[280px] lg:top-[350px] -right-8 sm:-right-16 lg:-right-20 object-contain absolute z-20 drop-shadow-lg"
            style={{
              transform: isMobile
                ? `translateY(${-offset * 0.08}px) scale(${1 + Math.sin(Date.now() / 3200 + 3) * 0.015})`
                : `translateY(${-offset * 0.15}px) translateX(${mousePosition.x * 15}px) rotate(${mousePosition.y * 6}deg) scale(${1 + Math.sin(Date.now() / 3200 + 3) * 0.03})`,
              transition: "transform 0.2s ease-out"
            }}
          />
        </div>

        <button 
          style={{
            // fontFamily: "heading",

          }}
          className="sticky uppercase bottom-5 font-bold cursor-pointer text-2xl px-8 py-4 rounded-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-2 bg-white text-black tracking-tight duration-400"
        
        >
          Grab yours
        </button>      
      </div>
    </div>
  );
}

export default Banner;