import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  TrashIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import axios from "axios";
import { Server } from "../../consts";
import { CircularProgress } from "@mui/material";
import { selectFirebaseToken } from "../../redux/authSlice";
import moment from "moment";

const EditUsersScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams(); // Keep original param name - this is the firebaseUID
  const [orders, setOrders] = useState([]);
  const firebaseToken = useSelector(selectFirebaseToken);

  const location = useLocation();
  const currentPath = "users";

  // Create axios instance with authentication
  const createAuthHeaders = () => ({
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${firebaseToken}`,
    },
  });

  const fetchUserDetails = async () => {
    if (!id || !firebaseToken) {
      setError("Missing required authentication or user ID");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(
        `${Server}/api/users/admin/${id}`, 
        createAuthHeaders()
      );

      if (response.data.success) {
        const user = response.data.user;
        setUserDetails(user);
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
      } else {
        setError("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError(
        error.response?.data?.message || 
        error.response?.status === 404 ? "User not found" :
        error.response?.status === 401 ? "Authentication required" :
        error.response?.status === 403 ? "Access denied" :
        "Error fetching user details"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    
    setDeleting(true);
    setError("");
    
    try {
      const response = await axios.delete(
        `${Server}/api/users/admin/${id}`, 
        createAuthHeaders()
      );

      if (response.data.success) {
        alert("User deleted successfully");
        navigate("/admin/users");
      } else {
        setError("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(
        error.response?.data?.message || 
        "Error deleting user"
      );
    } finally {
      setDeleting(false);
    }
  };

  const updateUser = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await axios.put(
        `${Server}/api/users/admin/${id}`, 
        {
          name: name.trim(),
          email: email.trim(),
          isAdmin: admin,
        },
        createAuthHeaders()
      );

      if (response.data.success) {
        alert("User updated successfully");
        // Refresh user details
        await fetchUserDetails();
      } else {
        setError("Failed to update user");
      }
    } catch (err) {
      console.error("Failed to update user", err);
      setError(
        err.response?.data?.message || 
        "Error updating user"
      );
    } finally {
      setLoading(false);
    }
  };

  // Orders functionality (assuming you have an orders API)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadOrders = async (pageNum) => {
    if (!userDetails?._id) return;

    try {
      if (pageNum === 1) setLoadingOrder(true);
      else setLoadingMore(true);

      // Using firebaseUID for orders API since that's what the backend expects
      const response = await axios.get(
        `${Server}/api/orders/user/${id}?page=${pageNum}&limit=2`,
        createAuthHeaders()
      );

      if (response.data.success) {
        const { orders: fetchedOrders, pagination } = response.data;
        
        if (pageNum === 1) {
          setOrders(fetchedOrders);
        } else {
          setOrders((prev) => [...prev, ...fetchedOrders]);
        }

        setPage(pagination.page);
        setTotalPages(pagination.pages);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoadingOrder(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (id && firebaseToken) {
      fetchUserDetails();
    }
  }, [id, firebaseToken]);

  useEffect(() => {
    if (userDetails?._id) {
      loadOrders(1);
    }
  }, [userDetails]);



  return (
    <>
      <div className="flex lg:flex-row flex-col overflow-y-hidden w-full items-center">
        {/* Sidebar */}
        <AdminSidebar currentPath={currentPath} />

        {/* Main Content */}
        <div className="w-full bg-white lg:w-[78%] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-white overflow-y-scroll flex flex-col h-screen lg:bg-[#EFF3F8] lg:px-[30px]">
          <AdminHeader />
          <div className="flex p-[14px] lg:p-[24px] flex-col w-full">
            {/* Header with Back Button */}
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => navigate("/admin/users")}
                className="flex items-center space-x-2 text-gray-600 hover:text-black transition"
              >
                <ArrowLeftIcon className="size-5" />
                <span>Back to Users</span>
              </button>
            </div>

            <h2
              style={{ fontWeight: 600 }}
              className="text-xl hidden lg:block mb-0 font-semibold"
            >
              User Details
            </h2>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="lg:bg-white mt-3 w-full lg:p-[24px]">
              {loading && !userDetails ? (
                <div className="w-full flex flex-col justify-center items-center h-[200px]">
                  <CircularProgress size={60} sx={{ color: "black", mb: 2 }} />
                  <span className="text-lg font-medium">Loading User...</span>
                </div>
              ) : userDetails ? (
                <form className="mt-0" onSubmit={(e) => e.preventDefault()}>
                  {/* User Info Display */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">User Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Firebase UID:</span> {userDetails.firebaseUID}
                      </div>
                      <div>
                        <span className="font-semibold">MongoDB ID:</span> {userDetails._id}
                      </div>
                      <div>
                        <span className="font-semibold">Created:</span> {moment(userDetails.createdAt).format("DD/MM/YYYY HH:mm")}
                      </div>
                      <div>
                        <span className="font-semibold">Updated:</span> {moment(userDetails.updatedAt).format("DD/MM/YYYY HH:mm")}
                      </div>
                    </div>
                  </div>

                  {/* Editable Fields */}
                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Name
                    </div>
                    <input
                      type="text"
                      placeholder="User Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-2 outline outline-[#bdbfbf] hover:outline-black focus:outline-black transition-all duration-500 text-base py-[8px] px-[12px]"
                    />
                  </div>

                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Email
                    </div>
                    <input
                      type="email"
                      value={email}
                      placeholder="User Email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full outline outline-[#bdbfbf] hover:outline-black focus:outline-black transition-all duration-500 py-[8px] px-[12px]"
                    />
                  </div>

                  <div className="space-y-2 mb-10">
                    <div className="text-sm font-semibold text-gray-700 tracking-wide">
                      Admin Status
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3">
                      <label className="flex justify-between items-center p-3 bg-white border border-[#ecf0f4] w-full lg:w-[49%] cursor-pointer hover:border-gray-400 transition">
                        <span className="text-sm">Is Admin</span>
                        <input
                          type="checkbox"
                          checked={admin}
                          onChange={(e) => setAdmin(e.target.checked)}
                          className="w-4 h-4"
                        />
                      </label>
                    </div>
                  </div>

                  {/* User Orders Section */}
                  <div className="text-sm font-semibold text-gray-700 tracking-wide">
                    User Orders
                  </div>
                  <div className="flex flex-col min-h-[400px] border-y mt-4 border-[#0c1b1e1c] py-4">
                    {orders.length === 0 && !loadingOrder ? (
                      <span className="text-gray-400 text-[18px] text-center py-8">
                        User hasn't placed any orders yet.
                      </span>
                    ) : (
                      <div className="flex relative flex-col">
                        {/* Orders Table */}
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
                              {orders.map((item, index) => (
                                <tr
                                  key={item._id}
                                  className={`rounded-lg hover:bg-gray-50 transition ${
                                    index % 2 === 0
                                      ? "bg-white"
                                      : "bg-[#F8F9FC]"
                                  }`}
                                >
                                  <td className="text-center rounded-l-lg text-sm p-3 py-5 font-semibold text-stone-800">
                                    #{item._id.substr(0, 6)}...
                                  </td>
                                  <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                                    {moment(item.createdAt).format("DD/MM/YYYY")}
                                  </td>
                                  <td className="text-center text-sm p-3 py-5 font-semibold text-stone-800">
                                    ${item.totalPrice}
                                  </td>
                                  <td className="text-center text-sm p-3 py-5 font-semibold">
                                    <span
                                      className={`px-3 py-[6px] rounded-full text-xs md:text-sm font-medium inline-block
                                        ${
                                          item.deliveryStatus === "Delivered"
                                            ? "bg-green-100 text-green-800"
                                            : item.deliveryStatus === "Processing"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : item.deliveryStatus === "Processed"
                                            ? "bg-blue-100 text-blue-800"
                                            : item.deliveryStatus === "Dispatched"
                                            ? "bg-purple-100 text-purple-800"
                                            : item.deliveryStatus === "Cancelled" || item.deliveryStatus === "Cancelled By Admin"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                    >
                                      {item.deliveryStatus}
                                    </span>
                                  </td>
                                  <td className="text-center rounded-r-lg text-sm p-3 py-5 font-semibold text-stone-800">
                                    <button
                                      onClick={() =>
                                        navigate(`/admin/order/${item._id}`)
                                      }
                                      className="px-4 py-[6px] animated-button cursor-pointer border text-sm font-medium hover:bg-blue-500 hover:text-white transition"
                                    >
                                      View Details
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Loading Overlay */}
                        {loadingOrder && (
                          <div className="w-full h-full justify-center flex absolute top-0 z-[20] left-0 bg-[#ffffffcf] items-center">
                            <CircularProgress size={40} sx={{ color: "black" }} />
                          </div>
                        )}

                        {/* Load More Button */}
                        {page < totalPages && !loadingOrder && (
                          <button
                            onClick={async () => {
                              const nextPage = page + 1;
                              await loadOrders(nextPage);
                            }}
                            disabled={loadingMore}
                            className="mx-auto mt-10 border animated-button cursor-pointer px-6 py-2 hover:bg-black hover:text-white transition disabled:opacity-50"
                          >
                            {loadingMore ? (
                              <div className="flex items-center space-x-2">
                                <CircularProgress size={16} sx={{ color: "currentColor" }} />
                                <span>Loading...</span>
                              </div>
                            ) : (
                              "Load More Orders"
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row items-center justify-between mt-8">
                    <button
                      onClick={updateUser}
                      type="button"
                      disabled={loading}
                      className="bg-black cursor-pointer w-[49%] mt-5 px-5 py-3 text-white lg:w-[30%] hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <CircularProgress size={16} sx={{ color: "white" }} />
                          <span>Updating...</span>
                        </div>
                      ) : (
                        "Update User"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={deleteUser}
                      disabled={deleting}
                      className="animated-button border cursor-pointer w-[49%] justify-center flex flex-row items-center space-x-1 mt-5 px-5 py-3 text-red-600 border-red-600 hover:bg-red-600 hover:text-white lg:w-[30%] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting ? (
                        <div className="flex items-center space-x-2">
                          <CircularProgress size={16} sx={{ color: "currentColor" }} />
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        <>
                          <TrashIcon className="size-4" />
                          <span>Delete User</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-500">Failed to load user details</p>
                  <button
                    onClick={fetchUserDetails}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUsersScreen;