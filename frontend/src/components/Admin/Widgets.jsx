import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TruckIcon,
  UsersIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { Server } from "../../consts";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectFirebaseToken } from "../../redux/authSlice";

const Widget = ({ mode }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  
  const firebaseToken = useSelector(selectFirebaseToken);

  const modeConfig = {
    orders: {
      title: "Delivered",
      apiEndpoint: `${Server}/api/orders/delivered`,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      icon: TruckIcon,
      nav: "/admin/orders",
    },
    users: {
      title: "Users",
      apiEndpoint: `${Server}/api/users/count`,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: UsersIcon,
      nav: "/admin/users",
    },
    products: {
      title: "Products",
      apiEndpoint: `${Server}/api/products/admin/count`,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      icon: CubeIcon,
      nav: "/admin/products",
    },
  };

  const { title, apiEndpoint, iconBg, iconColor, icon: Icon, nav } = modeConfig[mode];

  useEffect(() => {
    const fetchData = async () => {
      if (!firebaseToken) {
        setValue(0);
        return;
      }

      try {
        setLoading(true);
        
        const response = await axios.get(apiEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          withCredentials: true,
        });

        let count = 0;
        if (mode === "orders") {
          count = response.data.length;
        } else if (mode === "users") {
          count = response.data.stats.total;
        } else if (mode === "products") {
          count = response.data.total || response.data.length || 0;
        }

        setValue(count);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        setValue(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint, mode, firebaseToken]);

  return (
    <div
      onClick={() => navigate(nav)}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
          {loading ? (
            <CircularProgress size={16} sx={{ color: "#6B7280", mt: 0.5 }} />
          ) : (
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          )}
        </div>
        <div className={`w-8 h-8 ${iconBg} rounded flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default Widget;