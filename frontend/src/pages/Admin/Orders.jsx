import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/Admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectFirebaseToken } from "../../redux/authSlice";
import { Server } from "../../consts";
import Loader from "../../components/LoadingBar";
import { AnimatePresence, motion } from "framer-motion";
import OrderStatusDisplay from "../../components/OrderStatusDisplay";

function Orders() {
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchPages, setSearchPages] = useState(1);

  // Get Firebase token from Redux
  const firebaseToken = useSelector(selectFirebaseToken);

  const isSearching = search.trim() !== "";
  const currentPath = "orders";

  // ✅ Filter options that match backend exactly
  const filterOptions = [
    "All Orders",
    "pending",
    "processing", 
    "out for delivery",
    "delivered",
    "cancelled",
    "cancelled by admin",
    "This Month",
    "Today",
  ];

  // ✅ Using reusable OrderStatusDisplay component

  const fetchOrders = async (pageToLoad = 1, append = false) => {
    if (!firebaseToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${Server}/api/orders?page=${pageToLoad}&limit=12&sort=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          withCredentials: true,
        }
      );
      
      // ✅ Backend returns: { success: true, orders: [...], pages: 5, pagination: {...} }
      const { orders, pages } = response.data;
      setAllOrders((prev) => (append ? [...prev, ...orders] : orders));
      setPages(pages);
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response?.status === 401) {
        console.error("Unauthorized - please log in again");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchOrders = async (pageToLoad = 1, append = false) => {
    if (!firebaseToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${Server}/api/orders/search?q=${search}&page=${pageToLoad}&limit=12`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          withCredentials: true,
        }
      );
      
      // ✅ Search endpoint returns: { success: true, orders: [...], pagination: { pages: 5 } }
      const data = response.data;
      const orders = data.orders || [];
      const pages = data.pagination?.pages || 1;
      
      setSearchOrders((prev) => (append ? [...prev, ...orders] : orders));
      setSearchPages(pages);
    } catch (err) {
      console.error("Search error:", err);
      if (err.response?.status === 401) {
        console.error("Unauthorized - please log in again");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSearching) {
      fetchSearchOrders(1, false);
      setSearchPage(1);
    } else {
      fetchOrders(1, false);
      setPage(1);
    }
  }, [filter, search, firebaseToken]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchOrders(next, true);
  };

  const handleLoadMoreSearch = () => {
    const next = searchPage + 1;
    setSearchPage(next);
    fetchSearchOrders(next, true);
  };

  const ordersToRender = isSearching ? searchOrders : allOrders;
  const maxPages = isSearching ? searchPages : pages;
  const currentPage = isSearching ? searchPage : page;
  const fakeOrders = [1, 2, 3, 4, 5, 6, 7];
  const handleFilterClick = (newFilter) => setFilter(newFilter);



  return (
    <div className="w-full lg:w-[78%] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-white overflow-y-scroll flex flex-col h-screen bg-[#EFF3F8] lg:px-[30px]">
      <AdminHeader />
      <div className="flex p-[14px] lg:p-[24px] flex-col w-full">
        <h2 style={{ fontWeight: 600 }} className="text-xl mb-0 font-semibold">
          {isSearching ? `Search Results for "${search}"` : "All Orders"}
        </h2>

        <div className="bg-white mt-3 w-full p-[16px] lg:p-[24px] border-gray-300 min-h-[550px]">
          {/* Search Input */}
          <div className="flex md:flex-row items-start md:justify-between justify-start flex-col md:items-center">
            <div className="md:w-[60%] w-full bg-[#F7F7F8] space-x-3 mr-5 flex px-2 py-3 flex-row items-center justify-between">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11.0475 17.89C13.7765 17.89 15.9891 15.6774 15.9891 12.9485C15.9891 10.2196 13.7765 8.00703 11.0475 8.00703C8.31853 8.00703 6.10596 10.2196 6.10596 12.9485C6.10596 15.6774 8.31853 17.89 11.0475 17.89Z"
                  stroke="#0C1B1E"
                  strokeWidth="1.4"
                />
                <path
                  d="M16 16L20.308 20.308"
                  stroke="#0C1B1E"
                  strokeWidth="1.4"
                />
              </svg>
              <input
                type="text"
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-base focus:outline-none bg-[#F7F7F8]"
              />
            </div>
          </div>

          {/* ✅ FIXED: Filters with correct backend status names */}
          <h2
            style={{ fontWeight: 600 }}
            className="text-base mt-10 mb-0 font-semibold"
          >
            Filters
          </h2>
          <div className="grid gap-y-2 gap-x-2 md:gap-y-5 grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-5 md:gap-x-5">
            {filterOptions.map((status) => (
              <div
                key={status}
                className={`flex justify-center cursor-pointer items-center md:p-[14px] py-4 px-2 md:px-[22px]
                    ${
                      filter === status
                        ? "bg-[#EFF3F8] border-[#a0c4e0]"
                        : "bg-white border border-[#ecf0f4]"
                    }`}
                onClick={() => handleFilterClick(status)}
              >
                <span className="font-[Inter] text-xs md:text-sm font-semibold">
                  {status === "All Orders" ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Orders Table */}
          <div className="relative mt-10 overflow-x-auto">
            <table className="min-w-[700px] text-center w-full">
              <thead>
                <tr>
                  <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                    Order ID
                  </th>
                  <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                    Customer
                  </th>
                  <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                    Date
                  </th>
                  <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                    Total
                  </th>
                  <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                    Order Status
                  </th>
                  <th className="bg-[#F8F9FC] font-semibold p-3 py-5 text-sm">
                    View Details
                  </th>
                </tr>
              </thead>
              <tbody className="min-h-[200px]">
                {loading ? (
                  <>
                    {fakeOrders.map((item, i) => (
                      <tr
                        key={i}
                        className={`${
                          i % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"
                        }`}
                      >
                        <td className="text-center text-[#F8F9FC] rounded-l-lg text-sm p-3 py-5 font-semibold ">
                          #122334
                        </td>
                        <td className="text-center text-[#F8F9FC] text-sm p-3 py-5 font-semibold ">
                          Loading...
                        </td>
                        <td className="text-center text-[#F8F9FC] text-sm p-3 py-5 font-semibold ">
                          9/11/2001
                        </td>
                        <td className="text-center text-[#F8F9FC] text-sm p-3 py-5 font-semibold ">
                          ₹45
                        </td>
                        <td className="text-center text-[#F8F9FC] text-sm p-3 py-5 font-semibold ">
                          Processing
                        </td>
                        <td className="text-center rounded-r-lg text-sm p-3 py-5 font-semibold ">
                          <button className="px-4 py-[6px] text-[#F8F9FC] cursor-pointer border text-sm font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : ordersToRender.length > 0 ? (
                  <>
                    {ordersToRender.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"
                        }`}
                      >
                        <td className="text-center rounded-l-lg text-sm p-3 py-5 font-semibold text-stone-800">
                          #{item.orderId}
                        </td>
                        <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                          {item.user?.name || 'N/A'}
                        </td>
                        <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                          {moment(item.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                          ₹{item.totalPrice?.toLocaleString() || '0'}
                        </td>
                        {/* ✅ Using reusable OrderStatusDisplay component */}
                        <td className="text-center text-sm p-3 py-5 font-semibold">
                          <OrderStatusDisplay status={item.deliveryStatus} variant="badge" />
                        </td>
                        <td className="text-center rounded-r-lg text-sm p-3 py-5 font-semibold text-stone-800">
                          <button
                            onClick={() => navigate(`/order/${item._id}/edit`)}
                            className="px-4 py-[6px] hover:bg-gray-50 transition-colors cursor-pointer border text-sm font-medium rounded"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-500">
                      {isSearching ? `No orders found for "${search}"` : "No orders found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Loader */}
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
          </div>

          {/* Load More */}
          {currentPage < maxPages && !loading && (
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={isSearching ? handleLoadMoreSearch : handleLoadMore}
                className="mx-auto mt-0 border hover:bg-black hover:text-white transition cursor-pointer px-6 py-2 rounded"
              >
                Load More Orders
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;