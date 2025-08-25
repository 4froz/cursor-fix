import React, { useState, useEffect, useRef } from "react";
import { Check, Clock, Shield, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bottleImg from "../assets/tumbler.png"; // main product image
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { openCartModal } from "../redux/modalSlice";
import { Server } from "../consts";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams(); // id is the product's MongoDB _id or slug
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Add this state for image selection

  const dispatch = useDispatch();
  console.log(id);
  const features = ["Sleek & Durable", "Premium Quality", "Leak-Proof"];
  
  useEffect(() => {
    setLoading(true);
    fetch(`${Server}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImageIndex(0); // Reset to first image when product loads
        console.log(data);
      })
      .catch((err) => {
        setProduct(null), console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

   const handleAddToCart = () => {
    dispatch(openCartModal());
    setTimeout(() => {
      dispatch(
        addToCart({
          _id:product._id,
          name: product.name,
          price: product.price,
          discountPrice: product.discountPrice,
          img: product.img[0],
          variant: "default", 
        })
      );
    }, 500);
  };
  // Function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Example reviews (replace with your own logic if needed)
  const reviews = [
    // {
    //   productId: "p001",
    //   userName: "Alia",
    //   review: "Way too harsh on my skin. Won't use again.",
    //   rating: 1,
    // },
    // ... more reviews ...
  ];
  const [selectedSize, setSelectedSize] = useState("350ml");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const productInfoRef = useRef(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Scroll listener for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (productInfoRef.current) {
        const rect = productInfoRef.current.getBoundingClientRect();
        const isScrolledPast = rect.bottom < 0;
        setShowStickyBar(isScrolledPast);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const accordionVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.2, delay: 0 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  };

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  const contentVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.2, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {loading ? (
     <section className="pt-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Breadcrumb */}
            <div className="text-sm bg-white text-white mb-12">
              <span className="">Home</span> / <span className="">Shop</span> /{" "}
              <span className="">adada</span>
            </div>

            {/* Product Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left: Images */}
              <div className="flex flex-col space-y-6">
                <div className="max-w-full h-[600px] bg-slate-200 animate-pulse transform" />
                {/* <div className="flex flex-row gap-4">
                {product.img.map((thumb, idx) => (
                  <img
                    key={idx}
                    src={thumb}
                    alt={`Thumbnail ${idx}`}
                    className="w-20 h-20 object-cover cursor-pointer hover:ring-2 ring-black"
                  />
                ))}
              </div> */}
              </div>

              {/* Right: Product Info */}
              <div className="flex flex-col justify-start">
                <h1 className="text-4xl text-slate-200 bg-slate-200 animate-pulse md:text-5xl font-black tracking-tighter mb-12 leading-none uppercase">
                  ssdsads
                </h1>

                {/* Feature List */}
                <div className="space-y-3 mb-12">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-base md:text-lg text-slate-200 bg-slate-200 animate-pulse leading-relaxed">
                      sdasdsdasdsad
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-base md:text-lg text-slate-200 bg-slate-200 animate-pulse leading-relaxed">
                      sdasdsadsadsd
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-base md:text-lg text-slate-200 bg-slate-200 animate-pulse leading-relaxed">
                      sdsadsadsads
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-3xl md:text-4xl text-slate-200 bg-slate-200 font-black mb-12">
                  ₹2300
                </p>

                {/* Add to Cart Button */}
                <button className="text-slate-200 bg-slate-200 px-12 py-4 text-xl font-bold tracking-wide mb-12">
                  ADD TO CART
                </button>

                {/* Shipping Info */}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Main Product Section */}
          <section className="pt-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              {/* Breadcrumb */}
              <div className="text-sm text-gray-500 mb-12">
                <a href="/" className="cursor-pointer hover:text-black">
                  Home
                </a>{" "}
                /{" "}
                <a href="/shop" className="text-black cursor-pointer">
                  Shop
                </a>{" "}
                /{" "}
                <span className="text-black cursor-pointer">
                  {product?.name}
                </span>
              </div>

              {/* Product Layout */}
              <div
                ref={productInfoRef}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
              >
                {/* Left: Images */}
                <div className="flex flex-col space-y-6">
                  {/* Main Image with smooth transition */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      key={selectedImageIndex} // This ensures animation on image change
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={product?.img[selectedImageIndex]}
                      alt={product?.name}
                      className="max-w-full h-auto transform"
                    />
                  </div>
                  
                  {/* Thumbnail Images */}
                  <div className="flex flex-row gap-4">
                    {product?.img?.map((thumb, idx) => (
                      <img
                        key={idx}
                        src={thumb}
                        alt={`Thumbnail ${idx}`}
                        onClick={() => handleThumbnailClick(idx)}
                        className={`w-20 h-20 object-cover cursor-pointer transition-all duration-200 ${
                          selectedImageIndex === idx
                            ? "ring-2 ring-black opacity-100"
                            : "hover:ring-2 ring-gray-300 opacity-70 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col justify-start">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 leading-none uppercase">
                    {product?.name}
                  </h1>

                  {/* Feature List */}
                  <div className="space-y-3 mb-12">
                    {features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-4">
                        <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                        <p className="text-base md:text-lg leading-relaxed">
                          {feat}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex flex-row items-center  mb-12 space-x-3">
                    <p className="text-3xl font-semibold md:text-4xl">
                      ₹{product?.price}
                    </p>
                    {product.discountPrice !== 0 && (
                      <p className="text-lg line-through text-gray-400">
                        ₹ {product.discountPrice}
                      </p>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="bg-black text-white px-12 py-4 text-xl font-bold tracking-wide hover:bg-stone-800 cursor-pointer transition-all duration-300 mb-12"
                  >
                    ADD TO CART
                  </button>

                  {/* Shipping Info */}
                  <div className="flex items-center gap-4 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span className="text-base md:text-lg">
                      Shipping estimate: 2-4 working days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Accordion Section */}
          <section className="mt-32">
            <div className="max-w-7xl mx-auto px-6">
              <div className="divide-y divide-gray-200">
                {/* Product Description Accordion */}
                <div>
                  <button
                    onClick={() => toggleAccordion(0)}
                    className="w-full flex items-center justify-between py-6 text-left cursor-pointer transition-colors duration-200"
                  >
                    <span className="text-2xl md:text-4xl font-black tracking-tighter leading-none uppercase">
                      PRODUCT DESCRIPTION
                    </span>
                    <motion.div
                      variants={chevronVariants}
                      animate={openAccordion === 0 ? "open" : "closed"}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === 0 && (
                      <motion.div
                        variants={accordionVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden"
                      >
                        <motion.div
                          variants={contentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="py-5 lg:py-0 lg:pb-12"
                        >
                          <p className="text-base md:text-lg leading-relaxed opacity-80">
                            Meet your new daily companion. The Verre Tumbler
                            features a sleek and durable design crafted to match
                            your lifestyle while keeping you hydrated throughout
                            the day. Made from premium 18/8 stainless steel with
                            double-wall vacuum insulation, this tumbler
                            maintains your beverage temperature for hours.
                            Whether you're commuting, working, or exploring, the
                            Verre Tumbler's leak-proof construction and
                            ergonomic design make it the perfect choice for
                            those who demand both style and functionality. Its
                            compact form fits seamlessly into car cup holders,
                            backpacks, and your daily routine, ensuring you stay
                            refreshed wherever life takes you.
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Details Accordion */}
                <div>
                  <button
                    onClick={() => toggleAccordion(1)}
                    className="w-full flex items-center justify-between py-6 text-left cursor-pointer transition-colors duration-200"
                  >
                    <span className="text-2xl md:text-4xl font-black tracking-tighter leading-none uppercase">
                      PRODUCT DETAILS
                    </span>
                    <motion.div
                      variants={chevronVariants}
                      animate={openAccordion === 1 ? "open" : "closed"}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === 1 && (
                      <motion.div
                        variants={accordionVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden"
                      >
                        <motion.div
                          variants={contentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="py-5 lg:py-0 lg:pb-12"
                        >
                          <div className="space-y-6">
                            <div className="flex justify-between border-b border-gray-200 pb-4">
                              <span className="text-base md:text-lg font-bold text-gray-900">
                                Capacity
                              </span>
                              <span className="text-base md:text-lg opacity-80">
                                350ml / 500ml
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-4">
                              <span className="text-base md:text-lg font-bold text-gray-900">
                                Material
                              </span>
                              <span className="text-base md:text-lg opacity-80">
                                18/8 Stainless Steel
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-4">
                              <span className="text-base md:text-lg font-bold text-gray-900">
                                Height
                              </span>
                              <span className="text-base md:text-lg opacity-80">
                                18.5cm
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-4">
                              <span className="text-base md:text-lg font-bold text-gray-900">
                                Weight
                              </span>
                              <span className="text-base md:text-lg opacity-80">
                                320g
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-base md:text-lg font-bold text-gray-900">
                                Insulation
                              </span>
                              <span className="text-base md:text-lg opacity-80">
                                Double Wall Vacuum
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Care & Maintenance Accordion */}
                <div>
                  <button
                    onClick={() => toggleAccordion(2)}
                    className="w-full flex items-center justify-between py-6 text-left cursor-pointer transition-colors duration-200"
                  >
                    <span className="text-2xl md:text-4xl font-black tracking-tighter leading-none uppercase">
                      CARE & MAINTENANCE
                    </span>
                    <motion.div
                      variants={chevronVariants}
                      animate={openAccordion === 2 ? "open" : "closed"}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === 2 && (
                      <motion.div
                        variants={accordionVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden"
                      >
                        <motion.div
                          variants={contentVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="py-5 lg:py-0 lg:pb-12"
                        >
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                                CLEANING
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                                  <p className="text-base md:text-lg leading-relaxed">
                                    Hand wash with warm soapy water
                                  </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                                  <p className="text-base md:text-lg leading-relaxed">
                                    Use bottle brush for thorough cleaning
                                  </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                                  <p className="text-base md:text-lg leading-relaxed">
                                    Air dry completely before storing
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                                MAINTENANCE
                              </h4>
                              <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                                  <p className="text-base md:text-lg leading-relaxed">
                                    Do not microwave or freeze
                                  </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                                  <p className="text-base md:text-lg leading-relaxed">
                                    Avoid harsh chemicals or bleach
                                  </p>
                                </div>
                                <div className="flex items-start space-x-4">
                                  <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                                  <p className="text-base md:text-lg leading-relaxed">
                                    Replace lid seal if damaged
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* Why Verre Section */}
          <section className="mt-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 leading-none uppercase">
                    WITH VERRE®,
                    <br />
                    STAYING HYDRATED
                    <br />
                    IS EASY
                  </h2>

                  <div className="space-y-3 mb-12">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                      <p className="text-base md:text-lg leading-relaxed">
                        Keeps your drink hot or cold for hours
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                      <p className="text-base md:text-lg leading-relaxed">
                        Eco-friendly and BPA-free
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                      <p className="text-base md:text-lg leading-relaxed">
                        Sleek design fits everywhere
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                      <p className="text-base md:text-lg leading-relaxed">
                        Keeps beverages hot for up to 8 hours
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0" />
                      <p className="text-base md:text-lg leading-relaxed">
                        Maintains cold temperature for 12+ hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={bottleImg}
                    alt="Lifestyle"
                    className="max-w-full h-auto transform"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-32 bg-white divide-y text-black">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                  FAQ
                </h2>
              </div>

              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    IS IT DISHWASHER SAFE?
                  </h3>
                  <p className="text-base md:text-lg opacity-80">
                    Hand washing is recommended to maintain the vacuum seal and
                    finish quality.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    HOW LONG DOES IT KEEP DRINKS HOT/COLD?
                  </h3>
                  <p className="text-base md:text-lg opacity-80">
                    Hot beverages stay warm for 8 hours, cold drinks remain
                    chilled for 12+ hours.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    WHAT SIZES ARE AVAILABLE?
                  </h3>
                  <p className="text-base md:text-lg opacity-80">
                    Available in 350ml and 500ml capacities to suit different
                    needs.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    DOES IT FIT IN CAR CUP HOLDERS?
                  </h3>
                  <p className="text-base md:text-lg opacity-80">
                    Yes, designed to fit standard car cup holders perfectly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Guarantee Section */}
          <section className=" mt-32 py-32 bg-black text-white text-center">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-center mb-12">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 leading-none">
                OUR GUARANTEE
              </h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80">
                We stand behind every Verre tumbler with a 1-year warranty
                against manufacturing defects. Not satisfied? Return within 30
                days for a full refund.
              </p>
            </div>
          </section>

          {/* Sticky Bottom Bar */}
          <AnimatePresence>
            {showStickyBar && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  opacity: { duration: 0.3 },
                }}
                className="sticky w-full bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
              >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                  <div>
                    <h1 className="text-base md:text-xl font-black tracking-tighter uppercase">
                      {product?.name}
                    </h1>
                    <p className="text-sm md:text-base font-bold text-black">
                      ₹{product?.price}
                    </p>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="bg-black text-white px-6 py-3 md:px-12 md:py-4 text-sm md:text-xl font-bold tracking-wide hover:bg-stone-800 cursor-pointer transition-all duration-300"
                  >
                    ADD TO CART
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default ProductPage;