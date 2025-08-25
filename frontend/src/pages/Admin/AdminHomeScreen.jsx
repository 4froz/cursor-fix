import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  CubeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import Dashboard from "./Dashboard";
import Products from "./Products";
import Users from "./Users";
import Orders from "./Orders";
import AdminSidebar from "../../components/Admin/AdminSidebar";
// import { usePageFade } from "../PageFade";

function AdminHomeScreen() {
  const navigate = useNavigate();
  const location = useLocation(); // Access the current location
  const currentPath = location.pathname.split("/").pop(); // Extracts the last segment, e.g., "dashboard"
  console.log(currentPath);
  const navigateWithFade = useNavigate();

  return (
    <div className="flex lg:flex-row flex-col overflow-y-hidden w-full items-center">
     <AdminSidebar currentPath={currentPath} />

      {/* Header */}

      {currentPath === "dashboard" ? (
        <Dashboard />
      ) : currentPath === "products" ? (
        <Products />
      ) : currentPath === "users" ? (
        <Users />
      ) : currentPath === "orders" ? (
        <Orders />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default AdminHomeScreen;
