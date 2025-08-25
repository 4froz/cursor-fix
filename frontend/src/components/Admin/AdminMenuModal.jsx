import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  CubeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

const AdminMenuModal = ({ loginModal, setLoginModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  const closeModal = () => {
    setLoginModal(false);
  };

  return (
    <AnimatePresence>
      {loginModal && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/60 bg-opacity-50"
            onClick={closeModal}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed z-[2001] left-0 top-0 h-full w-[90%] sm:w-[50%] lg:w-[30%] bg-white p-5 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-semibold text-xl">Salesboard</span>
              <XMarkIcon
                className="size-5 cursor-pointer"
                onClick={closeModal}
              />
            </div>

            {/* Menu Items */}
            {[
              {
                name: "Dashboard",
                path: "dashboard",
                icon: Squares2X2Icon,
                to: "/admin/dashboard",
              },
              {
                name: "Orders",
                path: "orders",
                icon: ShoppingBagIcon,
                to: "/admin/orders",
              },
              {
                name: "Users",
                path: "users",
                icon: UsersIcon,
                to: "/admin/users",
              },
              {
                name: "Products",
                path: "products",
                icon: CubeIcon,
                to: "/admin/products",
              },
            ].map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.to);
                  closeModal();
                }}
                className="flex mt-6 cursor-pointer items-center space-x-4"
              >
                <div
                  className={`p-1 rounded-md ${
                    currentPath === item.path
                      ? "bg-[#07CE4E]"
                      : "bg-[#38383D]"
                  }`}
                >
                  <item.icon className="size-5 text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    currentPath === item.path ? "text-black" : "text-gray-500"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}

            <span
              onClick={() => navigate("/")}
              className="text-red-600 font-medium mt-auto cursor-pointer"
            >
              Exit Admin Panel
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminMenuModal;
