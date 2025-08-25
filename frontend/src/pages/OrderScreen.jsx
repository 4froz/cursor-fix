import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Navigator from "../components/Navigator";
import axios from "axios";
import { Server } from "../consts";
import { motion } from "framer-motion";
import OrderStep from "../components/OrderStep";
import OrderStatusDisplay from "../components/OrderStatusDisplay";
import {
  selectFirebaseToken,
  selectUser,
  selectIsAuthenticated,
  selectIsInitialized,
} from "../redux/authSlice";

const OrderScreen = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [cancelLoading, setCancelLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  // Redux selectors
  const firebaseToken = useSelector(selectFirebaseToken);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);

  // Redirect if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, navigate, isInitialized]);

  const getOrderById = async () => {
    if (!firebaseToken) {
      setError("Please log in to view order details");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${Server}/api/orders/my-orders/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
        }
      );

      const { order } = response.data;
      setOrder(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      if (error.response?.status === 401) {
        setError("Please log in to view order details");
        navigate("/login");
      } else if (error.response?.status === 404) {
        setError("Order not found or you don't have permission to view it");
      } else {
        setError(
          error.response?.data?.message || "Failed to load order details"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async () => {
    if (
      !firebaseToken ||
      order.deliveryStatus !== "pending" ||
      order.isCancelled
    ) {
      return;
    }

    try {
      setCancelLoading(true);
      await axios.put(
        `${Server}/api/orders/${order._id}/cancel`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
        }
      );

      await getOrderById();
    } catch (err) {
      console.error("Cancel error:", err);
      setError(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  // Backend already handles ownership verification in getMyOrderById
  // No need for frontend ownership check

  useEffect(() => {
    if (params.id && firebaseToken) {
      getOrderById();
    }
  }, [params.id, firebaseToken]);

  // ✅ Using reusable OrderStatusDisplay component

  // Show loading state
  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-screen">
        <span className="text-lg font-medium">Loading Order Details...</span>
      </div>
    );
  }

  // Show error state (but not while loading)
  if (error && !loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-screen">
        <span className="text-lg font-medium text-red-600 mb-4">{error}</span>
        <button
          onClick={() => navigate("/account")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Account
        </button>
      </div>
    );
  }

  const canCancelOrder =
    order.deliveryStatus === "pending" && !order.isCancelled;

  return (
    <div className="flex h-auto bg-[#fff] flex-col">
      <div className="flex flex-col pt-3 px-[16px] md:px-[32px] lg:px-[32px] xl:px-[62px]">
        <Navigator
          breadcrumbs={[
            { label: "Account", to: "/account" },
            {
              label: `Order #${order?.orderId || order?._id?.substr(0, 6)}...`,
              to: null,
            },
          ]}
        />
      </div>

      <div className="lg:flex mb-20 px-2 lg:px-20 h-auto items-center justify-center lg:mt-10 lg:space-x-10">
        <div className="xl:w-[50%] lg:w-[80%] sm-[100%] w-full rounded-lg">
          <div className="flex flex-col p-2 mt-10 md:p-7 w-full">
            <h1 className="text-xl self-start md:self-center uppercase lg:text-2xl font-semibold">
              Order Details
            </h1>

            <div className="flex mt-10 flex-row w-full justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium text-sm">Order number</span>
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

            {/* Enhanced Order Info Section */}
            <div className="flex flex-col mt-[24px] bg-white space-y-2">
              <div className="flex flex-row justify-between text-sm md:text-base items-center">
                <span className="font-semibold">Estimated delivery:</span>
                <span>{order.estTime || 7} days</span>
              </div>

              <div className="flex flex-row justify-between text-sm md:text-base items-center">
                <span className="font-semibold">Delivery Method:</span>
                <span>Standard Delivery</span>
              </div>

              {/* Payment Date - NEW */}

              {/* Payment ID - NEW */}

              {/* Tracking ID */}
              {order.trackingId && (
                <div className="flex flex-row justify-between text-sm md:text-base items-center">
                  <span className="font-semibold">Tracking Id:</span>
                  <span>{order.trackingId}</span>
                </div>
              )}

              {/* Delivered Date - NEW */}
              {order.deliveredAt && (
                <div className="flex flex-row justify-between text-sm md:text-base items-center">
                  <span className="font-semibold">Delivered On:</span>
                  <span>
                    {moment(order.deliveredAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              )}

              {/* Cancelled Date and Reason - NEW */}
              {order.isCancelled && (
                <>
                  {order.cancelledAt && (
                    <div className="flex flex-row justify-between text-sm md:text-base items-center">
                      <span className="font-semibold">Cancelled On:</span>
                      <span>
                        {moment(order.cancelledAt).format("MMM DD, YYYY")}
                      </span>
                    </div>
                  )}

                </>
              )}
            </div>

            {/* Order Progress Steps */}
            {!order.isCancelled &&
              order.deliveryStatus !== "cancelled" &&
              order.deliveryStatus !== "cancelled by admin" && (
                <div className="flex space-y-1 mt-5 flex-col">
                  <OrderStep
                    label="Pending"
                    status="pending"
                    currentStatus={order.deliveryStatus}
                    message="Thank you for your order! We have received it and will start processing it shortly."
                  />
                  <OrderStep
                    label="Processing"
                    status="processing"
                    currentStatus={order.deliveryStatus}
                    message="Your order is being prepared for shipment."
                  />
                  <OrderStep
                    label="Dispatched"
                    status="out for delivery"
                    currentStatus={order.deliveryStatus}
                    message="Your order is on its way! You can track it using the provided link."
                  />
                  <OrderStep
                    label="Delivered"
                    status="delivered"
                    currentStatus={order.deliveryStatus}
                    message="Your order has been delivered. We hope you enjoy your purchase!"
                  />
                </div>
              )}

            {/* Status History Section - NEW */}
            {order.statusHistory && order.statusHistory.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
                <div className="space-y-3">
                  {order.statusHistory
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, newest first
                    .map((history, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded"
                      >
                        <OrderStatusDisplay status={history.status} variant="dot" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">
                              <OrderStatusDisplay status={history.status} variant="text" />
                            </span>
                            <span className="text-xs text-gray-500">
                              {moment(history.date).format(
                                "MMM DD, YYYY HH:mm"
                              )}
                            </span>
                          </div>
                          {history.note && (
                            <p className="text-sm text-gray-600 mt-1">
                              {history.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <h1 className="text-xl mt-20 self-start md:self-center uppercase lg:text-xl font-semibold">
              Order Summary
            </h1>

            {/* Order Items */}
            {order?.orderItems?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
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
                  <span className="text-[14px] font-medium">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Delivery Address */}
            <span className="text-lg mt-12 font-semibold mb-2">
              Delivery Address
            </span>
            <span className="text-sm">{order?.shippingAddress?.address}</span>
            <span className="text-sm -translate-y-1">
              {order?.shippingAddress?.city}, {order?.shippingAddress?.state}
            </span>
            <span className="text-sm -translate-y-2">
              {order?.shippingAddress?.zipCode}
            </span>

            {/* Payment Method */}
            <span className="text-lg mt-8 font-semibold mb-2">
              Mode Of Payment
            </span>
            <span className="text-sm">
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>

            {/* Delivery Method */}
            <span className="text-lg mt-8 font-semibold mb-2">
              Delivery Method
            </span>
            <span className="text-sm">
              {order.deliveryMethod === "express" ? "Express Delivery" : "Regular Delivery"}
              <span className="text-xs text-gray-500 ml-2">
                ({order.deliveryMethod === "express" ? "1-2 business days" : "3-5 business days"})
              </span>
            </span>
          </div>

          {/* Cancel Order Button */}
          {canCancelOrder && (
            <div
              onClick={cancelOrder}
              className="flex justify-center self-center py-3 px-6 items-center mt-10 mb-5 rounded font-semibold text-sm bg-[#E4E4E4] hover:bg-gray-200 cursor-pointer"
            >
              {cancelLoading ? "Cancelling..." : "Cancel Order"}
            </div>
          )}

          {/* Cancel Warning for non-pending orders */}
          {!canCancelOrder && order.deliveryStatus !== "cancelled" && order.deliveryStatus !== "cancelled by admin" && (
            <div className="flex self-center flex-row mt-10 items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span className="text-[13px] font-semibold text-red-600">
                Sorry! Cancellation is not possible at this moment
              </span>
            </div>
          )}

          {/* Order Summary Totals */}
          <div className="flex w-full mt-[80px] flex-col">
            <div className="flex text-[#707070] text-sm flex-row justify-between">
              Subtotal ·{" "}
              {order?.orderItems?.reduce((sum, item) => sum + item.qty, 0)}{" "}
              products
              <span className="text-sm text-[#707070]">
                ₹{order?.itemsPrice?.toLocaleString()}
              </span>
            </div>
            <div className="flex mt-2 mb-5 flex-row justify-between">
              <span className="text-sm text-[#707070]">
                {order?.deliveryMethod === "express" ? "Express Delivery" : "Regular Delivery"}
              </span>
              <span className="text-sm text-[#707070]">
                {order?.shippingPrice > 0
                  ? `₹${order.shippingPrice.toLocaleString()}`
                  : "Free"}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="lg:text-2xl text-base font-semibold">Total</span>
              <span className="base:text-2xl text-lg font-semibold">
                ₹{order?.totalPrice?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
