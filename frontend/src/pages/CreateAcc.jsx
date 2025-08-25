import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Server } from "../consts";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setLoading, setError, clearError } from "../redux/authSlice";

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  }, [name, email, password, confirmPassword, authError, dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearError());

    // Input validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setLocalError("All fields are required.");
      return;
    }

    if (name.trim().length < 2) {
      setLocalError("Name must be at least 2 characters long.");
      return;
    }

    if (name.trim().length > 50) {
      setLocalError("Name cannot exceed 50 characters.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    dispatch(setLoading(true));

    try {
      // Step 1: Check if email already exists in backend
      const emailCheckResponse = await axios.post(`${Server}/api/users/check-email`, {
        email: email.trim().toLowerCase(),
      });

      if (emailCheckResponse.data.exists) {
        setLocalError("An account with this email already exists. Please login instead.");
        dispatch(setLoading(false));
        return;
      }

      // Step 2: Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Step 3: Update Firebase profile with name
      await updateProfile(userCredential.user, {
        displayName: name.trim()
      });

      // Step 4: Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // Step 5: Register with backend using Firebase ID token
      const registerResponse = await axios.post(`${Server}/api/users/register`, {
        name: name.trim(),
        idToken: idToken, // Send Firebase ID token for verification
      });

      // Step 6: Update Redux store with user data and token
      dispatch(setCredentials({
        user: registerResponse.data.user,
        firebaseToken: idToken,
      }));

      // Step 7: Navigate to home page
      navigate("/");

    } catch (error) {
      console.error("Registration error:", error);

      // Handle Firebase authentication errors
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setLocalError("An account with this email already exists. Please login instead.");
            break;
          case "auth/invalid-email":
            setLocalError("Invalid email format.");
            break;
          case "auth/weak-password":
            setLocalError("Password should be at least 6 characters long.");
            break;
          case "auth/missing-password":
            setLocalError("Password is required.");
            break;
          case "auth/missing-email":
            setLocalError("Email is required.");
            break;
          case "auth/too-many-requests":
            setLocalError("Too many attempts. Please try again later.");
            break;
          case "auth/network-request-failed":
            setLocalError("Network error. Please check your connection.");
            break;
          case "auth/operation-not-allowed":
            setLocalError("Email/password registration is not enabled.");
            break;
          default:
            setLocalError("Firebase registration failed. Please try again.");
        }
      }
      // Handle backend API errors
      else if (error.response) {
        const message = error.response.data?.message || "Registration failed";
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
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 leading-none uppercase">
              CREATE ACCOUNT
            </h1>

            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mb-6 text-sm md:text-base rounded">
                {displayError}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-8">
              <div>
                <label className="block text-base md:text-lg font-semibold mb-3 uppercase">
                  NAME
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full border-2 border-gray-300 focus:border-black hover:border-black transition-all duration-300 text-sm md:text-base py-3 md:py-4 px-3 md:px-4 outline-none"
                  placeholder="Enter your full name"
                  disabled={isLoading}
                  maxLength="50"
                />
              </div>

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
                  className="w-full border-2 border-gray-300 focus:border-black hover:border-black transition-all duration-300 text-sm md:text-base py-3 md:py-4 px-3 md:px-4 outline-none"
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
                  autoComplete="new-password"
                  className="w-full border-2 border-gray-300 focus:border-black hover:border-black transition-all duration-300 text-sm md:text-base py-3 md:py-4 px-3 md:px-4 outline-none"
                  placeholder="Enter your password (min 6 characters)"
                  disabled={isLoading}
                  minLength="6"
                />
              </div>

              <div>
                <label className="block text-base md:text-lg font-semibold mb-3 uppercase">
                  CONFIRM PASSWORD
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full border-2 border-gray-300 focus:border-black hover:border-black transition-all duration-300 text-sm md:text-base py-3 md:py-4 px-3 md:px-4 outline-none"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  minLength="6"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white px-6 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold tracking-wide hover:bg-stone-800 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
              </button>
            </form>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-sm md:text-base mt-8">
              <a
                href="/login"
                className="underline cursor-pointer hover:text-stone-600 transition-colors duration-300"
              >
                ALREADY HAVE AN ACCOUNT? SIGN IN
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateAccount;