import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Server } from "../consts";
import moment from "moment";
import { clearCredentials, selectIsInitialized } from "../redux/authSlice";
import Loader from "../components/LoadingBar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { selectUser, selectFirebaseToken, selectIsAuthenticated } from "../redux/authSlice";
import OrderStatusDisplay from "../components/OrderStatusDisplay";

function Account() {
  // Fixed Redux selectors - Use your proper auth slice
  const user = useSelector(selectUser);
  const firebaseToken = useSelector(selectFirebaseToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized); // ✅ new
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth check - Fixed to use proper selectors
  useEffect(() => {
      if (isInitialized && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate,isInitialized]);

  // Fixed API headers with proper Firebase authentication
  const getApiHeaders = () => {
    if (!firebaseToken) {
      throw new Error("No authentication token available");
    }
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${firebaseToken}` // This is what your backend expects
    };
  };

  // Fixed order loading function
  const loadOrders = async (pageNum = 1) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
        setError('');
      } else {
        setLoadingMore(true);
      }

      // Fixed API endpoint - Use the correct backend route
      const response = await axios.get(
        `${Server}/api/orders/my-orders?page=${pageNum}&limit=10`,
        {
          headers: getApiHeaders() // Now includes Firebase token
        }
      );

      const data = response.data;

      if (pageNum === 1) {
        setOrders(data.orders || []);
      } else {
        setOrders((prev) => [...prev, ...(data.orders || [])]);
      }

      // Fixed pagination handling to match backend response
      setPage(data.pagination?.page || pageNum);
      setTotalPages(data.pagination?.pages || 1);
      setHasMore(data.pagination?.hasMore || false);

    } catch (err) {
      console.error("Failed to fetch orders:", err);
      
      const errorMessage = err?.response?.data?.message || 
                          err?.message || 
                          "Failed to load orders";
      
      setError(errorMessage);
      
      // Handle auth errors
      if (err?.response?.status === 401) {
        dispatch(clearCredentials());
        navigate("/login");
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load orders when authenticated
  useEffect(() => {
    if (isAuthenticated && firebaseToken) {
      loadOrders(1);
    }
  }, [isAuthenticated, firebaseToken]);

  // ✅ Using reusable OrderStatusDisplay component

  // Handle logout
  const handleLogout = () => {
    navigate("/");
    setTimeout(() => {
      dispatch(clearCredentials());
    }, 800);
  };

  // Loading state
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex px-6 pt-20 min-h-screen max-w-7xl mx-auto flex-col w-full">
        
        <span className="text-[24px] md:text-[32px] mt-5 mb-1 font-semibold">
          My Account
        </span>

        <div className="flex flex-row items-center">
          <span className="text-[16px] md:text-[18px] mb-3">
            Welcome back, {user?.name}!
          </span>
          <span
            onClick={handleLogout}
            className="text-[16px] md:text-[18px] text-slate-600 cursor-pointer mb-3 italic underline ml-2 hover:text-slate-800 transition"
          >
            Log out
          </span>
        </div>

        <span className="text-[20px] md:text-[24px] mt-7 font-semibold">
          Account Details
        </span>
        <div className="flex flex-col space-y-1 mt-2">
          <span className="text-[16px] md:text-[18px]">{user?.name}</span>
          <span className="text-[16px] md:text-[18px] text-gray-600">{user?.email}</span>
        </div>

        <span className="text-[20px] md:text-[24px] mt-10 font-semibold">
          Order History
        </span>

        <div className="flex flex-col min-h-screen border-y mt-4 border-[#0c1b1e1c] py-4">
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              <p className="text-sm">{error}</p>
              <button 
                onClick={() => loadOrders(1)}
                className="text-red-800 underline text-sm mt-1 hover:no-underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Empty State */}
          {orders.length === 0 && !loading && !error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-gray-400 text-[18px] mb-4">
                You haven't placed any orders yet.
              </span>
              <button
                onClick={() => navigate("/shop")}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex relative flex-col">
              
              {/* Desktop Table */}
              <div className="w-full overflow-x-auto">
                <table className="min-w-[700px] text-center mt-0 w-full">
                  <thead>
                    <tr>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Order ID
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Date
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Items
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Total
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Status
                      </th>
                      <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={`rounded-lg ${
                          index % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"
                        }`}
                      >
                        <td className="text-center rounded-l-lg text-sm p-3 py-5 font-semibold text-stone-800">
                          #{order?.orderId || 'N/A'}
                        </td>
                        <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                          {moment(order.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                          {order?.orderItems?.length || 0} item{order?.orderItems?.length !== 1 ? 's' : ''}
                        </td>
                        <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                          {/* Fixed currency symbol to ₹ */}
                          ₹{order?.totalPrice?.toLocaleString() || '0'}
                        </td>
                        <td className="text-center text-sm p-3 py-5 font-semibold">
                          <OrderStatusDisplay status={order?.deliveryStatus} variant="badge" />
                        </td>
                        <td className="text-center rounded-r-lg text-sm p-3 py-5 font-semibold text-stone-800">
                          <button
                            onClick={() => navigate(`/account/order/${order._id}`)}
                            className="px-4 py-[6px] border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-sm font-medium rounded transition"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm">#{order?.orderId || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{moment(order.createdAt).format("DD/MM/YYYY")}</p>
                      </div>
                      <OrderStatusDisplay status={order?.deliveryStatus} variant="badge" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          {order?.orderItems?.length || 0} item{order?.orderItems?.length !== 1 ? 's' : ''}
                        </p>
                        <p className="font-semibold">₹{order?.totalPrice?.toLocaleString() || '0'}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/account/order/${order._id}`)}
                        className="px-3 py-1 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-sm rounded transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loading Overlay */}
              {loading && (
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
              )}

              {/* Load More Button */}
              {hasMore && !loading && orders.length > 0 && (
                <button
                  onClick={() => loadOrders(page + 1)}
                  disabled={loadingMore}
                  className="mx-auto mt-10 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 px-6 py-2 rounded transition disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load More Orders"}
                </button>
              )}
              
              {/* Pagination Info */}
              {orders.length > 0 && (
                <div className="text-center mt-6 text-sm text-gray-500">
                  Showing {orders.length} of {totalPages > 1 ? 'many' : orders.length} orders
                  {totalPages > 1 && ` (Page ${page} of ${totalPages})`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;