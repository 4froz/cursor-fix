import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { Server } from "../consts";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigateWithFade = useNavigate();

  const handleReset = async () => {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Backend email check first
      const res = await axios.post(`${Server}/api/users/check-email`, { email });
      if (!res.data.exists) {
        setError("No account found with this email.");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error("Backend error:", err);
      setError("Something went wrong while verifying the email.");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent. Please check your inbox.");
    } catch (err) {
      console.error("Firebase error:", err);
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-md mx-auto">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-12 leading-none uppercase">
              RESET PASSWORD
            </h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mb-6 text-sm md:text-base">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-6 text-sm md:text-base">
                {success}
              </div>
            )}

            <div className="space-y-8">
              <div>
                <label className="block text-base md:text-lg font-semibold mb-3 uppercase">
                  EMAIL
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full border-2 border-gray-300 focus:border-black hover:border-black transition-all duration-300 text-sm md:text-base py-3 md:py-4 px-3 md:px-4 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <button
                onClick={handleReset}
                disabled={loading}
                className="w-full bg-black text-white px-6 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold tracking-wide hover:bg-stone-800 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "SENDING..." : "SUBMIT"}
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-sm md:text-base">
                <a
                  href={"/login"}
                  className="underline cursor-pointer hover:text-stone-600 transition-colors duration-300"
                >
                  BACK TO LOGIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
