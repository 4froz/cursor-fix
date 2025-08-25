import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
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
    <footer className="bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div
              style={{ fontFamily: "heading" }}
              className="text-3xl font-black tracking-tight"
            >
              VERRE
            </div>
            <p className="text-lg opacity-70 max-w-md mb-8">
              Redefining hydration through innovative design and uncompromising
              quality.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/verre_brand"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:opacity-60 transition-opacity"
              >
                INSTAGRAM
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 tracking-wide">VERRE</h4>
            <div className="space-y-3">
              <a
                href="/shop"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Shop
              </a>
              <a
                href="/about-us"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                About
              </a>
              <a
                href="/contact-us"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 tracking-wide">SUPPORT</h4>
            <div className="space-y-3">
              <a
                href="/terms"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Terms & Conditions
              </a>
              <a
                href="/shipping"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Shipping Policy
              </a>
              <a
                href="/privacy"
                className="block text-sm hover:opacity-60 transition-opacity"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="opacity-50 text-sm">
            © 2025 Verre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
