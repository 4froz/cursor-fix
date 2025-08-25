import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  CheckIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import axios from "axios";
import moment from "moment";
import { Server } from "../../consts";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFirebaseToken } from "../../redux/authSlice";

const EditOrder = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [cancelLoading, setCancelLoading] = useState(false);

  const [order, setorder] = useState({});
  const [tracklingId, settracklingId] = useState("");
  const params = useParams();
  const [cancelNote, setCancelNote] = useState("");
  // Get Firebase token from Redux
  const firebaseToken = useSelector(selectFirebaseToken);

  const getOrderById = async () => {
    if (!firebaseToken) {
      setloading(false);
      return;
    }

    try {
      setloading(true);
      const response = await axios.get(`${Server}/api/orders/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firebaseToken}`,
        },
        withCredentials: true,
      });
      const { order } = response.data; // Backend returns { success, order }
      console.log("Order data:", order);
      setStatus(order.deliveryStatus);
      setorder(order);
      settracklingId(order.trackingId || "");
      setloading(false);
    } catch (error) {
      console.error("Error fetching order:", error);
      if (error.response?.status === 401) {
        console.error("Unauthorized - please log in again");
      }
      setloading(false);
    }
  };

  useEffect(() => {
    getOrderById();
  }, [params.id, firebaseToken]);

  const [status, setStatus] = useState("");

  const submitHandler = async (e) => {
    if (!firebaseToken) {
      alert("Authentication required");
      return;
    }

    try {
      setloading(true);

      // Determine the note based on status
      let noteToSend;
      if (
        status.toLowerCase() === "cancelled" ||
        status.toLowerCase() === "cancelled by admin"
      ) {
        noteToSend = cancelNote.trim() || `Order ${status.toLowerCase()}`;
      } else {
        noteToSend = `Status updated to ${status}`;
      }

      // Send PUT request with the correct payload structure
      const response = await axios.put(
        `${Server}/api/orders/${order._id}`,
        {
          status: status.toLowerCase(), // Backend expects lowercase
          trackingId: tracklingId,
          note: noteToSend,
          ...(status.toLowerCase() === "cancelled" ||
          status.toLowerCase() === "cancelled by admin"
            ? {
                cancelReason:
                  cancelNote.trim() || `Order ${status.toLowerCase()}`,
              }
            : {}),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          withCredentials: true,
        }
      );

      console.log("Order updated successfully:", response.data);
      alert("Order updated successfully!");
      navigate("/admin/orders");
    } catch (error) {
      console.error("Error updating order:", error);
      if (error.response?.status === 401) {
        alert("Authentication required. Please log in again.");
      } else {
        alert("Failed to update order. Please try again.");
      }
    } finally {
      setloading(false);
    }
  };

  const location = useLocation();
  const currentPath = "orders";



  return (
    <>
      <div className="flex lg:flex-row flex-col overflow-y-hidden w-full items-center">
        <AdminSidebar currentPath={currentPath} />














        <div className="w-full bg-white lg:w-[78%] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-white overflow-y-scroll flex flex-col h-screen lg:bg-[#EFF3F8] lg:px-[30px]">
          <AdminHeader />
          <div className="flex p-[14px] lg p-[16px]:md:p-[24px] flex-col w-full">
            <div className="lg:bg-white mt-3 w-full lg p-[16px]:md:p-[24px] border-gray-300">
              {loading ? (
                <div className="w-full flex flex-col justify-center items-center h-[200px]">
                  <span className="text-lg font-medium">Loading Order...</span>
                  <CircularProgress size={60} sx={{ color: "black", mt: 1 }} />
                </div>
              ) : (
                <div className=" w-full font-[Inter] rounded-lg">
                  <div className="flex flex-col p-0 md:p-7 md:px-[40px] w-full">
                    <h1
                      style={{ fontWeight: 600 }}
                      className="text-xl self-start md:self-center uppercase lg:text-2xl font-semibold"
                    >
                      MANAGE ORDER
                    </h1>
                    <div className="flex mt-10 flex-row w-full justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          Order number
                        </span>
                        <span className="font-medium mt-3 uppercase text-sm">
                          {order?.orderId}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">Order date</span>
                        <span className="font-medium mt-3 uppercase text-sm">
                          {moment(order.createdAt).format("MM/DD/YY")}
                        </span>
                      </div>
                    </div>

                    {/* {order.paymentId && (
                <div className="flex flex-row justify-between text-sm md:text-base items-center">
                  <span className="font-semibold">Payment ID:</span>
                  <span className="text-xs md:text-sm">{order.paymentId}</span>
                </div>
              )} */}

                    {/* ✅ ADDED: Order Status and Payment Info */}
                    <div className="flex flex-col mt-6 space-y-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          Current Status:
                        </span>
                        <span className="text-sm font-semibold capitalize">
                          {order?.deliveryStatus}
                        </span>
                      </div>
                      {order.paymentId && (
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">
                            Razorpay Payment id
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              order?.isPaid
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {order?.paymentId}
                          </span>
                        </div>
                      )}
                      {order?.trackingId && (
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">
                            Current Tracking ID:
                          </span>
                          <span className="text-sm">{order.trackingId}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col mt-[24px] bg-white">
                      <div className="space-y-2 my-10">
                        <span className="text-lg font-bold mb-5">
                          Add Tracking Id
                        </span>

                        <div className="md:w-[60%] mt-4 w-full bg-[#F7F7F8] space-x-3 mr-5 flex px-2 py-3 flex-row items-center justify-between">
                          <input
                            type="text"
                            placeholder="Tracking Id"
                            value={tracklingId}
                            onChange={(e) => settracklingId(e.target.value)}
                            className="w-full text-base focus:outline-none bg-[#F7F7F8]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-lg font-bold mb-5">
                          Change Status
                        </span>

                        {/* Pending */}
                        <div className="flex mb-4 justify-between w-full items-center flex-row">
                          <div className="flex flex-row space-x-4 items-center">
                            {status.toLowerCase() === "pending" ? (
                              <div className="flex items-center justify-center rounded-full w-6 h-6 bg-yellow-200">
                                <svg
                                  className="text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                onClick={() => setStatus("pending")}
                                className="w-6 cursor-pointer h-6 border-[2px] border-slate-300 rounded-full"
                              />
                            )}
                            <span className="font-semibold">Pending</span>
                          </div>
                        </div>

                        {/* Processing */}
                        <div className="flex mb-4 justify-between w-full items-center flex-row">
                          <div className="flex flex-row space-x-4 items-center">
                            {status.toLowerCase() === "processing" ? (
                              <div className="flex items-center justify-center rounded-full w-6 h-6 bg-blue-200">
                                <svg
                                  className="text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                onClick={() => setStatus("processing")}
                                className="w-6 cursor-pointer h-6 border-[2px] border-slate-300 rounded-full"
                              />
                            )}
                            <span className="font-semibold">Processing</span>
                          </div>
                        </div>

                        {/* Out for Delivery */}
                        <div className="flex mb-4 justify-between w-full items-center flex-row">
                          <div className="flex flex-row space-x-4 items-center">
                            {status.toLowerCase() === "out for delivery" ? (
                              <div className="flex items-center justify-center rounded-full w-6 h-6 bg-purple-200">
                                <svg
                                  className="text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                onClick={() => setStatus("out for delivery")}
                                className="w-6 cursor-pointer h-6 border-[2px] border-slate-300 rounded-full"
                              />
                            )}
                            <span className="font-semibold">
                              Out for Delivery
                            </span>
                          </div>
                        </div>

                        {/* Delivered */}
                        <div className="flex mb-4 justify-between w-full items-center flex-row">
                          <div className="flex flex-row space-x-4 items-center">
                            {status.toLowerCase() === "delivered" ? (
                              <div className="flex items-center justify-center rounded-full w-6 h-6 bg-green-200">
                                <svg
                                  className="text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                onClick={() => setStatus("delivered")}
                                className="w-6 cursor-pointer h-6 border-[2px] border-slate-300 rounded-full"
                              />
                            )}
                            <span className="font-semibold">Delivered</span>
                          </div>
                        </div>

                        {/* Cancelled by Admin */}
                        <div className="flex mb-4 justify-between w-full items-center flex-row">
                          <div className="flex flex-row space-x-4 items-center">
                            {status.toLowerCase() === "cancelled by admin" ? (
                              <div className="flex items-center justify-center rounded-full w-6 h-6 bg-red-300">
                                <svg
                                  className="text-black"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div
                                onClick={() => setStatus("cancelled by admin")}
                                className="w-6 cursor-pointer h-6 border-[2px] border-slate-300 rounded-full"
                              />
                            )}
                            <span className="font-semibold">
                              Cancel Order (Admin)
                            </span>
                          </div>
                        </div>

                        {status.toLowerCase() === "cancelled by admin" && (
                          <div className="flex flex-col mt-8 space-y-2">
                            <span className="text-lg font-bold mb-2">
                              Cancellation Reason
                            </span>
                            <div className="md:w-[80%] w-full bg-[#F7F7F8] p-3 rounded">
                              <textarea
                                placeholder="Enter reason for cancellation (optional)"
                                value={cancelNote}
                                onChange={(e) => setCancelNote(e.target.value)}
                                className="w-full h-20 text-base focus:outline-none bg-[#F7F7F8] resize-none"
                                maxLength={200}
                              />
                              <div className="text-xs text-gray-500 mt-1">
                                {cancelNote.length}/200 characters
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <h1
                        style={{ fontWeight: 600 }}
                        className="text-xl mt-20 self-start md:self-center uppercase lg:text-xl font-semibold"
                      >
                        Order Summary
                      </h1>
                      {order?.orderItems?.map((item, index) => (
                        <div
                          key={index}
                          className="flex mt-5 w-full flex-row space-x-3 items-start"
                        >
                          <div className="relative">
                            <img
                              className="w-[100px] cursor-pointer h-[100px] rounded-md object-cover"
                              src={item.image}
                              alt={item.name}
                            />

                            <div className="absolute -top-2 opacity-70 -right-2 bg-black rounded-full flex flex-row w-5 h-5 justify-center items-center">
                              <span className="md:text-sm text-xs text-white">
                                {item.qty}
                              </span>
                            </div>
                          </div>

                          <div className="flex mt-3 w-[75%] flex-col">
                            <h1 className="text-[14px]">{item.name}</h1>
                            {item.variant && item.variant !== "default" && (
                              <span className="text-[14px] text-slate-400">
                                {item.variant}
                              </span>
                            )}
                            {/* ✅ FIXED: Currency symbol from $ to ₹ and added formatting */}
                            <span className="text-[14px] font-medium">
                              ₹{(item.price * item.qty).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}

                      <span
                        style={{ fontWeight: 600 }}
                        className="text-lg mt-12 font-semibold mb-2"
                      >
                        Customer
                      </span>
                      <span
                        onClick={() =>
                          navigate(`/user/${order?.user?.userId}/edit`)
                        }
                        className="text-base underline cursor-pointer"
                      >
                        {order?.user?.name}
                      </span>
                      <span className="text-base -translate-y-1">
                        {order?.user?.email}
                      </span>
                      <span
                        style={{ fontWeight: 600 }}
                        className="text-lg mt-8 font-semibold mb-2"
                      >
                        Delivery Address
                      </span>
                      <span className="text-sm">
                        {order?.shippingAddress?.address}
                      </span>
                      <span className="text-sm -translate-y-1">
                        {order?.shippingAddress?.city},{" "}
                        {order?.shippingAddress?.state}
                      </span>
                      <span className="text-sm -translate-y-2">
                        {order?.shippingAddress?.zipCode}
                      </span>

                      <span
                        style={{ fontWeight: 600 }}
                        className="text-lg mt-8 font-semibold mb-2"
                      >
                        Mode Of Payment
                      </span>
                      <span className="text-sm">
                        {order.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : "Online Payment"}
                      </span>

                      <span
                        style={{ fontWeight: 600 }}
                        className="text-lg mt-8 font-semibold mb-2"
                      >
                        Delivery Method
                      </span>
                      <span className="text-sm">
                        {order.deliveryMethod === "express" ? "Express Delivery" : "Regular Delivery"}
                        <span className="text-xs text-gray-500 ml-2">
                          ({order.deliveryMethod === "express" ? "1-2 business days" : "3-5 business days"})
                        </span>
                      </span>
                    </div>

                    <div
                      style={{ fontFamily: "" }}
                      className="flex w-full mt-[80px] flex-col"
                    >
                      <div className="flex text-[#707070] text-sm flex-row justify-between">
                        Subtotal ·{" "}
                        {order?.orderItems?.reduce(
                          (sum, item) => sum + item.qty,
                          0
                        )}{" "}
                        product
                        {order?.orderItems?.reduce(
                          (sum, item) => sum + item.qty,
                          0
                        ) !== 1
                          ? "s"
                          : ""}
                        <span className="text-sm text-[#707070]">
                          {/* ✅ FIXED: Removed hardcoded .00 and added proper formatting */}
                          ₹{order?.itemsPrice?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex mt-2 mb-5 flex-row justify-between">
                        <span className="text-sm text-[#707070]">
                          {order?.deliveryMethod === "express" ? "Express Delivery" : "Regular Delivery"}
                        </span>
                        <span className="text-sm text-[#707070]">
                          {/* ✅ FIXED: Use actual shipping price instead of hardcoded "Free" */}
                          {order?.shippingPrice > 0
                            ? `₹${order.shippingPrice.toLocaleString()}`
                            : "Free"}
                        </span>
                      </div>
                      <div className="flex flex-row justify-between">
                        <span
                          style={{ fontWeight: 700 }}
                          className="lg:text-2xl text-base font-semibold"
                        >
                          Total
                        </span>
                        <span
                          style={{ fontWeight: 700 }}
                          className="base:text-2xl text-lg font-semibold"
                        >
                          ₹{order?.totalPrice?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => submitHandler()}
                      disabled={loading}
                      className="bg-black cursor-pointer mt-10 px-5 py-3 text-white w-full lg:w-[30%] disabled:opacity-50 disabled:cursor-not-allowed"
                      type="submit"
                    >
                      {loading ? "Updating..." : "Update Order"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
