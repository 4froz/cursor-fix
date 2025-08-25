import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Server } from "../../consts";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFirebaseToken } from "../../redux/authSlice";

const PercentageDifference = () => {
  const [loading, setLoading] = useState(false);
  const [orderLength, setOrdersLength] = useState(0);
  const navigate = useNavigate();
  
  const firebaseToken = useSelector(selectFirebaseToken);

  useEffect(() => {
    const fetchTotalSalesThisYear = async () => {
      if (!firebaseToken) {
        setOrdersLength(0);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${Server}/api/orders/analytics/this-year`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${firebaseToken}`,
            },
            withCredentials: true,
          }
        );
        
        const total = response.data.total || 0;
        setOrdersLength(total);
      } catch (error) {
        console.error("Error fetching total sales this year:", error);
        setOrdersLength(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalSalesThisYear();
  }, [firebaseToken]);

  return (
    <div
      onClick={() => navigate("/admin/orders")}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Orders</p>
          {loading ? (
            <CircularProgress size={16} sx={{ color: "#6B7280", mt: 0.5 }} />
          ) : (
            <p className="text-2xl font-semibold text-gray-900 mt-1">{orderLength.toLocaleString()}</p>
          )}
        </div>
        <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
          <ShoppingBagIcon className="w-4 h-4 text-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default PercentageDifference;