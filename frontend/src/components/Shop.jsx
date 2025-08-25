import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Server } from "../consts";
import Loader from "../components/LoadingBar";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/Footer";

const PRODUCTS_PER_PAGE = 12;

// Always return 4 consecutive page numbers, clamped to valid range
function getPageNumbers(current, total) {
  const maxPages = 4;
  if (total <= maxPages) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current > total - maxPages + 1) {
    return Array.from({ length: maxPages }, (_, i) => total - maxPages + 1 + i);
  }
  return Array.from({ length: maxPages }, (_, i) => current + i);
}

function ShopPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: PRODUCTS_PER_PAGE,
          // Remove category and sort parameters since we want all products
        });
        const res = await fetch(`${Server}/api/products?${params.toString()}`);
        const data = await res.json();
        setTimeout(() => {
          setProducts(data.products);
          setTotalProducts(data.total);
          setTotalPages(data.pages);
          setLoading(false);
        }, 700);
      } catch (err) {
        setProducts([]);
        setTotalProducts(0);
        setTotalPages(1);
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentPage]);

  // Dynamic page numbers
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  // Animated page change
  const goToPage = (page) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPage(page);
        setTimeout(() => {
          setIsFading(false);
        }, 400);
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Full-screen fade overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#fff",
          zIndex: 9999,
          opacity: isFading ? 1 : 0,
          pointerEvents: isFading ? "auto" : "none",
          transition: "opacity 0.4s",
        }}
      />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <a href={"/"} className="cursor-pointer hover:text-black">
            Home
          </a>{" "}
          / <a className="text-black">Shop</a>
        </div>

        {/* Heading */}
        <h1
          style={{ fontFamily: "heading" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-16 leading-none"
        >
          SHOP ALL
        </h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-16">
            <div className="relative group flex flex-col">
              {/* Full-width image */}
              <div className="relative w-full overflow-hidden">
                <div className="w-full text-slate-200 bg-slate-200 animate-pulse aspect-[3/3.5] cursor-pointer object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute text-slate-200 bg-slate-200 animate-pulse top-3 left-3 px-2 py-1 text-xs font-medium uppercase">
                BEST SELLER
              </div>
              {/* Details */}
              <div className="mt-6 flex flex-col items-start">
                <h2 className="text-xl text-slate-200 bg-slate-200 animate-pulse font-semibold tracking-tight mb-2">
                  fdfdsf
                </h2>
                <p className="text-lg text-slate-200 bg-slate-200 animate-pulse = mb-4">
                  fdsfds
                </p>
                {/* <button className="px-8 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-stone-800 transition-colors">
                Add to Cart
              </button> */}
              </div>
            </div>
          </div>
        ) : (
          <>
            {products.length === 0 && !loading ? (
              <div className="flex flex-1 items-center justify-center min-h-[400px]">
                <span className="text-sm text-gray-500">No products found</span>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-16">
                  {products.map((item, idx) => (
                    
                    <div
                      key={item.id || idx}
                      onClick={() => navigate(`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`)}
                      className="relative group flex flex-col"
                    >
                      {/* Full-width image */}
                      <div className="relative w-full overflow-hidden">
                        <img
                          src={item.img[0]}
                          alt={item.name}
                          className="w-full aspect-[3/3.5] cursor-pointer object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {item.bestSellers && (
                        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium uppercase">
                          BEST SELLER
                        </div>
                      )}
                      {/* Details */}
                      <div className="mt-6 flex flex-col items-start">
                        <h2 className="text-xl font-semibold tracking-tight mb-2">
                          {item.name}
                        </h2>
                        <div className="flex flex-row items-center space-x-3">
                          <p className="text-lg font-semibold mb-4">
                            ₹ {item.price}
                          </p>
                          {item.discountPrice !== 0 && (
                            <p className="text-lg line-through text-gray-400 mb-4">
                              ₹ {item.discountPrice}
                            </p>
                          )}
                        </div>
                        {/* <button className="px-8 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-stone-800 transition-colors">
                Add to Cart
              </button> */}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination - Only show if more than 1 page */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center mt-10 mb-10">
                    <div className="flex flex-row justify-center items-center mb-2">
                      {currentPage > 1 && (
                        <svg
                          onClick={() => goToPage(currentPage - 1)}
                          width={16}
                          height={16}
                          className="-rotate-270 mr-2 cursor-pointer"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.875 7.438 12 17.563 22.125 7.438"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      )}

                      {pageNumbers.map((num) => (
                        <button
                          key={num}
                          className={`w-11 mr-3 cursor-pointer h-10 border text-lg ${
                            currentPage === num
                              ? "border-black font-bold"
                              : "border-gray-300"
                          }`}
                          onClick={() => goToPage(num)}
                          disabled={currentPage === num}
                        >
                          {num}
                        </button>
                      ))}

                      {currentPage < totalPages && (
                        <svg
                          onClick={() => goToPage(currentPage + 1)}
                          width={16}
                          height={16}
                          className="-rotate-90 cursor-pointer"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.875 7.438 12 17.563 22.125 7.438"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="text-sm mt-1 text-black">
                      You're viewing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}
                      -
                      {Math.min(currentPage * PRODUCTS_PER_PAGE, totalProducts)}{" "}
                      of {totalProducts} products
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Loading overlay */}
        {/* {loading && (
          <AnimatePresence>
            <motion.div
              className="w-full h-full justify-center flex absolute top-0 z-[20] left-0 bg-[#ffffffcf]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <Loader />
            </motion.div>
          </AnimatePresence>
        )} */}
      </main>

  
    </div>
  );
}

export default ShopPage;
