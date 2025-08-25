import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  CubeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/solid";

const AdminSidebar = ({ currentPath }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "dashboard",
      label: "Dashboard",
      icon: Squares2X2Icon,
      route: "/admin/dashboard",
    },
    {
      path: "orders",
      label: "Orders",
      icon: ShoppingBagIcon,
      route: "/admin/orders",
    },
    {
      path: "users",
      label: "Users",
      icon: UsersIcon,
      route: "/admin/users",
    },
    {
      path: "products",
      label: "Products",
      icon: CubeIcon,
      route: "/admin/products",
    },
  ];

  return (
    <div className="lg:flex hidden flex-col w-[22%] h-screen px-[32px] py-10 bg-[#fff]">
      <span className="font-semibold text-black text-3xl">VERRE Admin</span>

      <span className="mt-12 uppercase text-xs text-gray-400 font-semibold">
        Main Menu
      </span>

      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;
        
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.route)}
            className="flex mt-8 w-full flex-row cursor-pointer items-center space-x-4"
          >
            <div
              className={`flex flex-col justify-center ${
                isActive ? "bg-[#07CE4E]" : "bg-[#38383D]"
              } items-center p-1 rounded-md`}
            >
              <Icon className="size-5 text-white" />
            </div>
            <span
              className={`text-[14px] ${
                isActive ? "text-black" : "text-gray-500"
              } font-medium`}
            >
              {item.label}
            </span>
          </div>
        );
      })}

      <span
        onClick={() => navigate("/")}
        className="text-red-600 cursor-pointer font-medium absolute bottom-10"
      >
        Exit Admin Panel
      </span>
    </div>
  );
};

export default AdminSidebar;
