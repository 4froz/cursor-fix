import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFirebaseToken } from "../../redux/authSlice";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Server } from "../../consts";

function RecentOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  const getStatusDisplay = (status) => {
    const statusMap = {
      'pending': { label: 'Pending', color: 'bg-yellow-50 text-yellow-700' },
      'processing': { label: 'Processing', color: 'bg-blue-50 text-blue-700' },
      'out for delivery': { label: 'Dispatched', color: 'bg-purple-50 text-purple-700' },
      'delivered': { label: 'Delivered', color: 'bg-green-50 text-green-700' },
      'cancelled': { label: 'Cancelled', color: 'bg-red-50 text-red-700' },
      'cancelled by admin': { label: 'Cancelled', color: 'bg-red-50 text-red-700' }
    };

    const statusInfo = statusMap[status?.toLowerCase()] || 
                      { label: status || 'Unknown', color: 'bg-gray-50 text-gray-700' };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const firebaseToken = useSelector(selectFirebaseToken);

  useEffect(() => {
    const getOrders = async () => {
      if (!firebaseToken) {
        setLoading(false);
        setOrders([]);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${Server}/api/orders/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          withCredentials: true,
        });

        const recentOrders = response.data.orders?.slice(0, 5) || [];
        setOrders(recentOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [firebaseToken]);

  const SkeletonRow = () => (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Recent Orders</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : orders.length > 0 ? (
              orders.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">#{item?.orderId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{item.user?.name || "N/A"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">{moment(item.createdAt).format("MMM DD")}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">₹{item.totalPrice?.toLocaleString() || "0"}</span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusDisplay(item.deliveryStatus)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/order/${item._id}/edit`)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm">
                  {firebaseToken ? "No recent orders" : "Please log in to view orders"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;