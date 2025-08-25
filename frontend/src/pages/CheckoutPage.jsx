import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import codImg from "../assets/cod.png";
import GeoapifyAutocomplete from "../components/AddressAutoCom";
import { Server } from "../consts";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { openSuccesModal } from "../redux/modalSlice";
import { selectUser, selectFirebaseToken, selectIsAuthenticated, selectIsInitialized } from "../redux/authSlice";

// Razorpay script loader function
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const CheckoutPage = () => {
  // Redux selectors
  const user = useSelector(selectUser);
  const firebaseToken = useSelector(selectFirebaseToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialized = useSelector(selectIsInitialized);
  
  // ⚠️ SECURITY: Only get product IDs and quantities from cart, NOT prices
  const cartItems = useSelector((state) => state.cart.items);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔒 NEW: Server-validated cart data
  const [validatedCart, setValidatedCart] = useState(null);
  const [priceValidationLoading, setPriceValidationLoading] = useState(true);

  // Form state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("Razorpay");
  const [deliveryMethod, setDeliveryMethod] = useState("regular");
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    city: false,
    state: false,
    zipCode: false,
    address: false
  });

  // 🔒 SECURITY: Calculate prices from server-validated data only
  const subtotal = useMemo(() => {
    if (!validatedCart) return 0;
    return validatedCart.reduce((sum, item) => sum + item.validatedPrice * item.qty, 0);
  }, [validatedCart]);
  
  const deliveryPrice = deliveryMethod === "express" ? 140 : 70;
  const total = subtotal + deliveryPrice;

  // Auth check
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isInitialized]);

  // 🔒 NEW: Validate cart prices with server on component mount
  useEffect(() => {
    const validateCartPrices = async () => {
      if (!cartItems.length || !firebaseToken) {
        setPriceValidationLoading(false);
        return;
      }

      try {
        setPriceValidationLoading(true);
        
        // Send only product IDs and quantities for validation
        const cartValidationPayload = cartItems.map(item => ({
          productId: item._id, // Product ID
          qty: item.qty,
          variant: item.variant || "default"
        }));

        const response = await axios.post(
          `${Server}/api/cart/validate`,
          { items: cartValidationPayload },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${firebaseToken}`
            }
          }
        );

        if (response.data.success) {
          // Map server response to include all necessary display data
          const validatedItems = response.data.validatedItems.map(serverItem => {
            // Find corresponding cart item for display data
            const cartItem = cartItems.find(ci => ci._id === serverItem.productId);
            
            return {
              ...serverItem,
              // Use server-validated price, but keep display data from cart
              validatedPrice: serverItem.currentPrice, // Server's authoritative price
              name: cartItem?.name || serverItem.name,
              img: cartItem?.img || serverItem.img,
              variant: cartItem?.variant || "default",
              qty: serverItem.qty
            };
          });

          setValidatedCart(validatedItems);

          // Check for price discrepancies and warn user
          const priceChanges = validatedItems.filter(item => {
            const cartItem = cartItems.find(ci => ci._id === item.productId);
            return cartItem && cartItem.price !== item.validatedPrice;
          });

          if (priceChanges.length > 0) {
            const changedItems = priceChanges.map(item => item.name).join(', ');
            alert(`Price has been updated for: ${changedItems}. Please review your order.`);
          }
        }
      } catch (error) {
        console.error("❌ Cart validation failed:", error);
        alert("Failed to validate cart prices. Please refresh and try again.");
        navigate("/cart");
      } finally {
        setPriceValidationLoading(false);
      }
    };

    if (isAuthenticated && cartItems.length > 0) {
      validateCartPrices();
    } else {
      setPriceValidationLoading(false);
    }
  }, [cartItems, firebaseToken, isAuthenticated, navigate]);

  // Form validation
  const validateForm = () => {
    if (!name || !email || !address || !city || !state || !zipCode) {
      alert("Please fill all the required fields.");
      setErr(true);
      return false;
    }
    return true;
  };

  // API headers
  const getApiHeaders = () => {
    if (!firebaseToken) {
      throw new Error("No authentication token available");
    }
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${firebaseToken}`
    };
  };

  // 🔒 SECURITY: Create order with server-validated data
  const createOrder = async (paymentId = null) => {
    if (!validateForm() || !validatedCart) return;

    // 🔒 Use server-validated cart data for order creation
    const orderItems = validatedCart.map((item) => ({
      productId: item.productId, // Send product ID for server lookup
      name: item.name,
      image: item.img,
      qty: Number(item.qty),
      variant: item.variant || "default"
      // ⚠️ SECURITY: Do NOT send price from client - server will use validated price
    }));

    const shippingAddress = {
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: zipCode.trim()
    };

    const paymentMethod = payment === "COD" ? "cod" : "online";
    
    const orderPayload = {
      orderItems,
      shippingAddress,
      paymentMethod,
      deliveryMethod,
      // 🔒 SECURITY: Let server calculate final prices
      ...(paymentId && { paymentId })
    };

    try {
      setLoading(true);

      const response = await axios.post(
        `${Server}/api/orders`,
        orderPayload,
        {
          headers: getApiHeaders()
        }
      );

      const data = response.data;
      console.log("✅ Order Created:", data);

      // Success - navigate and clear cart
      navigate("/");
      setTimeout(() => {
        dispatch(clearCart());
        dispatch(openSuccesModal({ 
          orderId: data.order?._id || 'N/A'
        }));
      }, 1000);

    } catch (error) {
      console.error("❌ Error placing order:", error);
      
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Failed to place order. Please try again.";
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 🔒 SECURITY: Razorpay integration with server-validated amount
  const displayRazorpay = async () => {
    if (!validateForm() || !validatedCart) return;

    try {
      setLoading(true);
      
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // 🔒 SECURITY: Create payment order with server-calculated total
      const orderValidationPayload = {
        items: validatedCart.map(item => ({
          productId: item.productId,
          qty: item.qty,
          variant: item.variant
        })),
        deliveryMethod
      };

      const { data } = await axios.post(
        `${Server}/api/payment/create-order`,
        orderValidationPayload,
        { headers: getApiHeaders() }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to create payment order");
      }

      // Get payment config
      const configResponse = await axios.get(`${Server}/api/payment/config`);
      const paymentConfig = configResponse.data;

      const options = {
        key: paymentConfig.key_id,
        currency: data.currency,
        amount: data.amount, // Server-calculated amount
        order_id: data.id,
        name: "Verre Store",
        description: `Order payment for ₹${Math.round(data.amount / 100)}`,
        handler: function (response) {
          console.log("✅ Payment successful:", response);
          createOrder(response.razorpay_payment_id);
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#07CE4E"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error("❌ Error creating Razorpay order:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to initialize payment. Please try again.";
      alert(errorMessage);
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    await createOrder();
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Show loading if not authenticated, no cart items, or validating prices
  if (!isAuthenticated || !user || priceValidationLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <CircularProgress />
          <p className="mt-4 text-gray-600">
            {priceValidationLoading ? "Validating cart prices..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Show error if cart validation failed
  if (!validatedCart || validatedCart.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center w-full">
        <h1 className="font-medium text-lg">
          Nothing to checkout. Please add products to your cart.
          <Link to="/shop" className="ml-3 underline text-blue-400">
            Continue Shopping
          </Link>
        </h1>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "" }} className="flex flex-col">
      <div className="flex w-full flex-col">
        {/* Mobile Order Summary Toggle */}
        <div className="flex lg:hidden flex-col w-full">
          <div
            className="flex py-4.5 border-b border-[#0c1b1e1c] px-[12px] bg-[#F5F5F5] cursor-pointer flex-row justify-between items-center w-full"
            onClick={toggle}
          >
            <div className="flex flex-row items-center space-x-2">
              <span className="text-sm font-light">Order Summary</span>
              <span className="text-xl font-light">
                {isOpen ? (
                  <svg
                    className="-rotate-180"
                    width={10}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width={10}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    focusable="false"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.75 7.354 9.396a.5.5 0 0 1-.708 0L2 4.75"
                    ></path>
                  </svg>
                )}
              </span>
            </div>

            <span
              style={{ fontWeight: 600 }}
              className="base:text-2xl text-lg font-semibold"
            >
              ₹{total.toLocaleString()}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                className="flex overflow-hidden bg-[#F9F9F9] items-center border-b border-[#0c1b1e1c]"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{ willChange: "height, opacity" }}
              >
                <div className="w-full px-[12px] md:w-[70%] pb-5 mt-2 flex flex-col">
                  {/* 🔒 SECURITY: Using validatedCart instead of cartItems */}
                  {validatedCart.map((item, index) => (
                    <div
                      key={index}
                      className="flex mt-5 w-full flex-row justify-between items-center"
                    >
                      <div className="relative">
                        <img
                          className="w-[70px] cursor-pointer h-[70px] rounded-md"
                          src={item.img}
                          alt={item.name}
                        />
                        <div className="absolute -top-2 opacity-70 -right-2 bg-black rounded-full flex flex-row w-5 h-5 justify-center items-center">
                          <span className="md:text-sm text-xs text-white">
                            {item.qty}
                          </span>
                        </div>
                      </div>

                      <div className="flex w-[60%] flex-col">
                        <h1 className="text-[14px] md:text-[14px]">
                          {item.name}
                        </h1>
                        {item.variant !== "default" && (
                          <span className="md:text-[13px] text-[12px] text-gray-400">
                            {item.variant}
                          </span>
                        )}
                      </div>
                      <div className="flex w-[10%] justify-end items-end flex-col">
                        <span className="text-[16px]">
                          {/* 🔒 SECURITY: Using validatedPrice */}
                          ₹{(item.validatedPrice * item.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Mobile Price Summary */}
                  <div className="flex w-full mt-5 pt-5 flex-col">
                    <div className="flex text-[#707070] text-sm flex-row justify-between">
                      Subtotal · {validatedCart.reduce((sum, item) => sum + item.qty, 0)} products
                      <span className="text-sm text-[#707070]">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex mt-2 mb-5 flex-row justify-between">
                      <span className="text-sm text-[#707070]">
                        {deliveryMethod === "express" ? "Express Delivery" : "Regular Delivery"}
                      </span>
                      <span className="text-sm text-[#707070]">
                        ₹{deliveryPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between">
                      <span className="lg:text-2xl text-base font-semibold">
                        Total
                      </span>
                      <span className="base:text-2xl text-lg font-semibold">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex lg:flex-row flex-col relative">
          {/* Form Section */}
          <div className="flex flex-row px-[12px] sm:px-10 lg:px-10 justify-center lg:justify-end border-b border-r border-[#0c1b1e1c] w-full lg:w-[50%]">
            <div className="lg:w-[90%] xl:w-[75%] w-full md:w-[70%] flex flex-col">
              
              {/* Contact Section */}
              <div className="flex mt-5 flex-col">
                <span className="text-[21px] lg:mt-10 font-semibold">Contact</span>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  error={(touched.email || err) && !email}
                  helperText={(touched.email || err) && !email ? "Email is required" : ""}
                  label="Email"
                  value={email}
                  variant="outlined"
                  sx={{
                    mt: 2,
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                    "& label": { color: "#A1A1A1", fontWeight: 400 },
                    "& label.Mui-focused": { color: "black" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem",
                      "& fieldset": { borderColor: "#A1A1A1" },
                      "&:hover fieldset": { borderColor: "#A1A1A1" },
                      "&.Mui-focused fieldset": { borderColor: "black", borderWidth: "2px" },
                    },
                  }}
                />
              </div>

              {/* Delivery Section */}
              <div className="flex mt-10 flex-col">
                <span className="text-[21px] font-semibold">Delivery</span>

                <TextField
                  value={name}
                  required
                  fullWidth
                  label="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  error={(touched.name || err) && !name}
                  helperText={(touched.name || err) && !name ? "Full name is required" : ""}
                  variant="outlined"
                  sx={{
                    mt: 2,
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                    "& label": { color: "#A1A1A1", fontWeight: 400 },
                    "& label.Mui-focused": { color: "black" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem",
                      "& fieldset": { borderColor: "#A1A1A1" },
                      "&:hover fieldset": { borderColor: "#A1A1A1" },
                      "&.Mui-focused fieldset": { borderColor: "black", borderWidth: "2px" },
                    },
                  }}
                />

                <GeoapifyAutocomplete
                  address={address}
                  setaddress={setAddress}
                  err={err}
                  settouched={setTouched}
                  touched={touched}
                  onSelect={({ postalcode, address: addr, city: cityName, state: stateName }) => {
                    if (postalcode) setZipCode(postalcode);
                    if (addr) setAddress(addr);
                    if (cityName) setCity(cityName);
                    if (stateName) setState(stateName);
                  }}
                />

                <TextField
                  fullWidth
                  label="Apt, Suite, etc. (optional)"
                  variant="outlined"
                  sx={{
                    mt: 2,
                    "& input:-webkit-autofill": {
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                    "& label": { color: "#A1A1A1", fontWeight: 400 },
                    "& label.Mui-focused": { color: "black" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "0.5rem",
                      "& fieldset": { borderColor: "#A1A1A1" },
                      "&:hover fieldset": { borderColor: "#A1A1A1" },
                      "&.Mui-focused fieldset": { borderColor: "black", borderWidth: "2px" },
                    },
                  }}
                />

                {/* City field for mobile */}
                <div className="flex-1 md:hidden">
                  <TextField
                    onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
                    error={(touched.city || err) && !city}
                    helperText={(touched.city || err) && !city ? "City is required" : ""}
                    required
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(t) => setCity(t.target.value)}
                    variant="outlined"
                    sx={{
                      mt: 2,
                      "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                        transition: "background-color 5000s ease-in-out 0s",
                      },
                      "& label": { color: "#A1A1A1", fontWeight: 400 },
                      "& label.Mui-focused": { color: "black" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0.5rem",
                        "& fieldset": { borderColor: "#A1A1A1" },
                        "&:hover fieldset": { borderColor: "#A1A1A1" },
                        "&.Mui-focused fieldset": { borderColor: "black", borderWidth: "2px" },
                      },
                    }}
                  />
                </div>

                {/* City, State, ZIP row for desktop */}
                      <div className="flex flex-row space-x-4 w-full">
                    <div className="hidden md:flex flex-1">
                      <TextField
                        onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
                        error={(touched.city || err) && !city}
                        helperText={(touched.city || err) && !city ? "City is required" : ""}
                        required
                        fullWidth
                        value={city}
                        onChange={(t) => setCity(t.target.value)}
                        label="City"
                        variant="outlined"
                        sx={{
                          mt: 2,
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 1000px white inset",
                            WebkitTextFillColor: "black",
                            transition: "background-color 5000s ease-in-out 0s",
                          },
                          "& label": { color: "#A1A1A1", fontWeight: 400 },
                          "& label.Mui-focused": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "0.5rem",
                            "& fieldset": { borderColor: "#A1A1A1" },
                            "&:hover fieldset": { borderColor: "#A1A1A1" },
                            "&.Mui-focused fieldset": { borderColor: "black", borderWidth: "2px" },
                          },
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <TextField
                        onBlur={() => setTouched((prev) => ({ ...prev, state: true }))}
                        error={(touched.state || err) && !state}
                        helperText={(touched.state || err) && !state ? "State is required" : ""}
                        fullWidth
                        value={state}
                        onChange={(t) => setState(t.target.value)}
                        label="State/Province"
                        variant="outlined"
                        sx={{
                          mt: 2,
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 1000px white inset",
                            WebkitTextFillColor: "black",
                            transition: "background-color 5000s ease-in-out 0s",
                          },
                          "& label": { color: "#A1A1A1", fontWeight: 400 },
                          "& label.Mui-focused": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "0.5rem",
                            "& fieldset": { borderColor: "#A1A1A1" },
                            "&:hover fieldset": { borderColor: "#A1A1A1" },
                            "&.Mui-focused fieldset": { borderColor: "black", borderWidth: "2px" },
                          },
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <TextField
                        onBlur={() => setTouched((prev) => ({ ...prev, zipCode: true }))}
                        error={(touched.zipCode || err) && !zipCode}
                        helperText={(touched.zipCode || err) && !zipCode ? "ZIP code is required" : ""}
                        fullWidth
                        value={zipCode}
                        onChange={(t) => setZipCode(t.target.value)}
                        label="ZIP Code"
                        variant="outlined"
                        sx={{
                          mt: 2,
                          "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 1000px white inset",
                            WebkitTextFillColor: "black",
                            transition: "background-color 5000s ease-in-out 0s",
                          },
                          "& label": { color: "#A1A1A1", fontWeight: 400 },
                          "& label.Mui-focused": { color: "black" },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "0.5rem",
                            "& fieldset": { borderColor: "#A1A1A1" },
                            "&:hover fieldset": { borderColor: "#A1A1A1" },
                            "&.Mui-focused fieldset": { borderColor: "black", borderWidth: "2px" },
                          },
                        }}
                      />
                    </div>
                  </div>
              </div>

              {/* Payment Section */}
              <div className="flex flex-col mt-10">
                <span className="text-[21px] font-semibold">Payment</span>
                <span className="text-[14px] text-[#707070] font-semibold">
                  All transactions are secure and encrypted
                </span>

                {/* Online Payment Option */}
                <div className="flex flex-col mt-10 w-full">
                  <div
                    onClick={() => setPayment("Razorpay")}
                    className={`flex cursor-pointer flex-row justify-between items-center ${
                      payment === "Razorpay"
                        ? "bg-[#F8F5F9] border-black"
                        : "bg-white border-gray-400"
                    } border py-3 px-3 rounded-t-lg`}
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <div className="w-5 h-5 border rounded-full flex justify-center items-center">
                        {payment === "Razorpay" && (
                          <div className="w-3 h-3 bg-black rounded-full"></div>
                        )}
                      </div>
                      <div className="flex translate-y-0 flex-col">
                        <span className="text-[14px] font-semibold">
                          Online Payment
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {payment === "Razorpay" && (
                      <motion.div
                        key="razorpay"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-center items-center bg-[#f4f4f4] p-5 flex-col">
                          <div className="w-6 flex border justify-center bg-stone-800 items-center rounded-full h-6 mb-3">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                          <span className="md:text-sm text-xs text-center w-[80%] mt-0">
                            Pay securely using UPI, Cards, Net Banking, or Wallets
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* COD Option */}
                <div className="flex flex-col w-full">
                  <div
                    onClick={() => setPayment("COD")}
                    className={`flex cursor-pointer flex-row justify-between items-center ${
                      payment === "COD"
                        ? "bg-[#F8F5F9] border-black"
                        : "bg-white border-gray-400 rounded-b-lg"
                    } border py-3 px-3`}
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <div className="w-5 h-5 border rounded-full flex justify-center items-center">
                        {payment === "COD" && (
                          <div className="w-3 h-3 bg-black rounded-full"></div>
                        )}
                      </div>
                      <div className="flex translate-y-0 flex-col">
                        <span className="text-[14px] font-semibold">
                          Cash On Delivery (COD)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {payment === "COD" && (
                      <motion.div
                        key="COD"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex justify-center items-center bg-[#f4f4f4] p-5 flex-col">
                          <img className="w-[180px] md:w-[250px]" src={codImg} alt="COD" />
                          <span className="text-xs md:text-sm text-center w-[80%] mt-0">
                            After placing your order with Cash on Delivery,
                            you'll pay in cash directly to the delivery agent
                            when your package arrives at your address.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Delivery Method Section */}
                <div className="flex flex-col mt-10">
                  <span className="text-[21px] font-semibold">Delivery Method</span>
                  <span className="text-[14px] text-[#707070] font-semibold">
                    Choose your preferred delivery speed
                  </span>

                  {/* Regular Delivery Option */}
                  <div className="flex flex-col mt-10 w-full">
                    <div
                      onClick={() => setDeliveryMethod("regular")}
                      className={`flex cursor-pointer flex-row justify-between items-center ${
                        deliveryMethod === "regular"
                          ? "bg-[#F8F5F9] border-black"
                          : "bg-white border-gray-400"
                      } border py-3 px-3 rounded-t-lg`}
                    >
                      <div className="flex flex-row items-center space-x-3">
                        <div className="w-5 h-5 border rounded-full flex justify-center items-center">
                          {deliveryMethod === "regular" && (
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                          )}
                        </div>
                        <div className="flex translate-y-0 flex-col">
                          <span className="text-[14px] font-semibold">
                            Regular Delivery
                          </span>
                          <span className="text-[12px] text-[#707070]">
                            3-5 business days
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[14px] font-semibold">₹70</span>
                      </div>
                    </div>
                  </div>

                  {/* Express Delivery Option */}
                  <div className="flex flex-col w-full">
                    <div
                      onClick={() => setDeliveryMethod("express")}
                      className={`flex cursor-pointer flex-row justify-between items-center ${
                        deliveryMethod === "express"
                          ? "bg-[#F8F5F9] border-black"
                          : "bg-white border-gray-400 rounded-b-lg"
                      } border py-3 px-3`}
                    >
                      <div className="flex flex-row items-center space-x-3">
                        <div className="w-5 h-5 border rounded-full flex justify-center items-center">
                          {deliveryMethod === "express" && (
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                          )}
                        </div>
                        <div className="flex translate-y-0 flex-col">
                          <span className="text-[14px] font-semibold">
                            Express Delivery
                          </span>
                          <span className="text-[12px] text-[#707070]">
                            1-2 business days
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[14px] font-semibold">₹140</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="flex border-b pb-10 border-[#0c1b1e1c] mb-10">
                  {payment === "Razorpay" ? (
                    <button
                      onClick={displayRazorpay}
                      disabled={loading}
                      className="w-full mt-10 cursor-pointer bg-black text-white py-3 text-lg font-medium transition disabled:opacity-50"
                    >
                      {loading ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        `Pay ₹${total.toLocaleString()}`
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleCODOrder}
                      disabled={loading}
                      className="w-full mt-10 cursor-pointer bg-black text-white py-3 text-lg font-medium transition disabled:opacity-50"
                    >
                      {loading ? (
                        <CircularProgress size={20} sx={{ color: "white" }} />
                      ) : (
                        "Place Order"
                      )}
                    </button>
                  )}
                </div>

                {/* Footer Links */}
                <div className="flex flex-row space-x-5 md:space-x-5">
                  <Link to="/privacy" className="text-xs md:text-sm underline cursor-pointer">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-xs md:text-sm underline cursor-pointer">
                    Terms of Service
                  </Link>
                  <Link to="/shipping" className="text-xs md:text-sm underline cursor-pointer">
                    Shipping Policy
                  </Link>
                </div>
                <div className="flex flex-row mt-4 space-x-5 md:space-x-5">
                  <Link to="/contact-us" className="text-xs md:text-sm mb-[50px] lg:mb-[200px] underline cursor-pointer">
                    Contact Information
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Order Summary - Updated to use validatedCart */}
          <div className="hidden lg:flex flex-row lg:sticky lg:top-0 max-h-screen overflow-y-auto px-[12px] sm:px-10 justify-center lg:justify-start lg:pl-10 w-full lg:w-[50%] bg-[#F9F9F9]">
            <div className="lg:w-[90%] xl:w-[60%] w-full md:w-[70%] mt-10 flex flex-col">
              {/* 🔒 SECURITY: Using validatedCart */}
              {validatedCart.map((item, index) => (
                <div
                  key={index}
                  className="flex mt-5 w-full flex-row justify-between items-center"
                >
                  <div className="relative">
                    <img
                      className="w-[70px] bg-slate-50 cursor-pointer h-[70px] rounded-md"
                      src={item.img}
                      alt={item.name}
                    />
                    <div className="absolute -top-2 opacity-70 -right-2 bg-black rounded-full flex flex-row w-5 h-5 justify-center items-center">
                      <span className="md:text-sm text-xs text-white">
                        {item.qty}
                      </span>
                    </div>
                  </div>

                  <div className="flex w-[60%] flex-col">
                    <h1 className="text-[14px] md:text-[14px]">
                      {item.name}
                    </h1>
                    {item.variant !== "default" && (
                      <span className="md:text-[13px] text-[12px] text-gray-400">
                        {item.variant}
                      </span>
                    )}
                  </div>
                  <div className="flex w-[10%] justify-end items-end flex-col">
                    <span className="text-[16px] mt-3 mb-7">
                      {/* 🔒 SECURITY: Using validatedPrice */}
                      ₹{(item.validatedPrice * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              {/* Desktop Price Summary */}
              <div className="flex w-full mt-5 pt-5 flex-col">
                <div className="flex text-[#707070] text-sm flex-row justify-between">
                  Subtotal · {validatedCart.reduce((sum, item) => sum + item.qty, 0)} products
                  <span className="text-sm text-[#707070]">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex mt-2 mb-5 flex-row justify-between">
                  <span className="text-sm text-[#707070]">
                    {deliveryMethod === "express" ? "Express Delivery" : "Regular Delivery"}
                  </span>
                  <span className="text-sm text-[#707070]">
                    ₹{deliveryPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="lg:text-2xl text-base font-semibold">
                    Total
                  </span>
                  <span className="base:text-2xl text-lg font-semibold">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage