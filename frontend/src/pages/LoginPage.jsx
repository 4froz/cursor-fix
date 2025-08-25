import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setLoading, setError, clearError } from "../redux/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Server } from "../consts";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Clear errors when inputs change
  useEffect(() => {
    if (localError) {
      setLocalError("");
    }
    if (authError) {
      dispatch(clearError());
    }
  }, [email, password, authError, dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearError());

    // Input validation
    if (!email.trim() || !password.trim()) {
      setLocalError("Email and Password are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    dispatch(setLoading(true));

    try {
      // Step 1: Check if email exists in backend
      const emailCheckResponse = await axios.post(`${Server}/api/users/check-email`, {
        email: email.trim().toLowerCase(),
      });

      if (!emailCheckResponse.data.exists) {
        setLocalError("No account found with this email. Please create an account first.");
        dispatch(setLoading(false));
        return;
      }

      // Step 2: Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const firebaseUser = userCredential.user;

      // Step 3: Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      // Step 4: Login to backend with Firebase ID token
      const loginResponse = await axios.post(`${Server}/api/users/login`, {
        idToken: idToken, // Send Firebase ID token
      });

      // Step 5: Update Redux store with user data and token
      dispatch(setCredentials({
        user: loginResponse.data.user,
        firebaseToken: idToken,
      }));

      // Step 6: Navigate to dashboard/home
      navigate("/");

    } catch (error) {
      console.error("Login error:", error);

      // Handle Firebase authentication errors
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            setLocalError("No account found with this email.");
            break;
          case "auth/wrong-password":
            setLocalError("Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            setLocalError("Invalid email format.");
            break;
          case "auth/user-disabled":
            setLocalError("This account has been disabled.");
            break;
          case "auth/too-many-requests":
            setLocalError("Too many failed attempts. Please try again later.");
            break;
          case "auth/network-request-failed":
            setLocalError("Network error. Please check your connection.");
            break;
          default:
            setLocalError("Authentication failed. Please try again.");
        }
      } 
      // Handle backend API errors
      else if (error.response) {
        const message = error.response.data?.message || "Login failed";
        setLocalError(message);
      } 
      // Handle network or other errors
      else {
        setLocalError("Something went wrong. Please try again.");
      }

      dispatch(setLoading(false));
    }
  };

  // Display error from either local state or Redux
  const displayError = localError || authError;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl flex flex-col mx-auto">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-12 leading-none uppercase">
              LOGIN
            </h1>

            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mb-6 text-sm md:text-base rounded">
                {displayError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-8">
              <div>
                <label className="block text-base md:text-lg font-semibold mb-3 uppercase">
                  EMAIL
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full border-2 border-gray-300 focus:border-black hover:border-black transition-all duration-300 text-sm md:text-base py-3 px-3 outline-none"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold mb-3 uppercase">
                  PASSWORD
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full border-2 border-gray-300 focus:border-black hover:border-black transition-all duration-300 text-sm md:text-base py-3 px-3 outline-none"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white lg:px-12 px-6 py-3 lg:py-4 text-lg lg:text-xl font-bold tracking-wide hover:bg-stone-800 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </form>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-sm md:text-base mt-8">
              <a
                href="/forgotpass"
                className="underline cursor-pointer hover:text-stone-600 transition-colors duration-300"
              >
                FORGOT YOUR PASSWORD?
              </a>
              <span className="hidden sm:block text-gray-400">/</span>
              <a
                href="/createAccount"
                className="underline cursor-pointer hover:text-stone-600 transition-colors duration-300"
              >
                CREATE ACCOUNT
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;