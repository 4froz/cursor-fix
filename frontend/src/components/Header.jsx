import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuModal from "./MenuModal";
import { useDispatch, useSelector } from "react-redux";
import { openCartModal } from "../redux/modalSlice";
import CartModal from "./CartModal";

function HeaderUI({ bannerHeight = 600 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > bannerHeight - headerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bannerHeight, headerHeight]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/shop" },
    { name: "ABOUT", path: "/about-us" },
    { name: "CONTACT", path: "/contact-us" },
  ];

  const location = useLocation();

    if (
      location.pathname === "/checkout" ||
      location.pathname === "/admin/dashboard" ||
      location.pathname === "/admin/users" ||
      location.pathname === "/admin/orders" ||
      location.pathname === "/product/create" ||
      (location.pathname.startsWith("/product/") &&
        location.pathname.endsWith("/edit")) ||
      (location.pathname.startsWith("/user/") &&
        location.pathname.endsWith("/edit")) ||
      (location.pathname.startsWith("/order/") &&
        location.pathname.endsWith("/edit")) ||
      location.pathname === "/admin/products"
    )
      return null;
  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div
            onClick={() => setIsMenuOpen(true)}
            className="w-1/3 flex lg:hidden flex-row justify-start cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.692 12.646h16.616M3.692 5.762h16.616M3.692 19.608h16.616"
                stroke="currentColor"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>

          {/* Logo */}
          <a
            // onClick={() => navigate("/")}
            href="/"
            style={{ fontFamily: "heading" }}
            className="text-3xl w-1/3 lg:w-[20%] flex justify-center lg:justify-start cursor-pointer font-black tracking-tight"
          >
            VERRE
          </a>

          {/* Desktop Nav */}
          <nav className="hidden w-1/3 lg:w-[60%] lg:flex flex-row justify-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-sm font-semibold tracking-wide transition-opacity `}
              >
                {link.name}
              </a>
            ))}
            {user?.isAdmin && (
              <a
                href={"/admin/dashboard"}
                className={`text-sm uppercase font-semibold tracking-wide transition-opacity `}
              >
                Enter Admin Panel
              </a>
            )}
          </nav>

          {/* Right side icons */}
          <div className="flex w-1/3 lg:w-[20%] flex-row justify-end">
            <div
              onClick={() => dispatch(openCartModal())}
              className="cursor-pointer flex relative lg:mr-[14px] w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.148 11.479c-.101-1.428-.125-2.985-.296-4.57C15.577 4.37 14.372 2.64 12 2.64S8.423 4.37 8.148 6.908c-.171 1.586-.195 3.142-.296 4.57"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeMiterlimit="10"
                  strokeLinejoin="bevel"
                ></path>
                <path
                  d="M20.701 20.438V8.816H3.3v11.622H20.7z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeMiterlimit="10"
                ></path>
              </svg>
              <div className="absolute -bottom-1 -left-1 bg-black rounded-full flex flex-row w-4 h-4 justify-center items-center">
                <span className="md:text-sm text-xs text-white">
                  {cartItems.length}
                </span>
              </div>
            </div>

            <div
              onClick={() => (user ? navigate("/account") : navigate("/login"))}
              className="cursor-pointer hidden lg:flex w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] flex-shrink-0"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M12 12.413a4.358 4.358 0 1 0 0-8.715 4.358 4.358 0 0 0 0 8.715zM3.488 20.857c0-3.085 1.594-5.61 5.26-5.61h6.503c3.667 0 5.261 2.525 5.261 5.61"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeMiterlimit="10"
                ></path>
              </svg>
            </div>

            {/* Mobile Menu Button */}
          </div>
        </div>
      </div>

      <MenuModal setOpen={setIsMenuOpen} open={isMenuOpen} />
      <CartModal />
    </header>
  );
}

export default HeaderUI;
