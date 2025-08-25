import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectIsAdmin, selectIsInitialized } from "../redux/authSlice";

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const isInitialized = useSelector(selectIsInitialized);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized) {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
        return;
      }
      
      if (!isAdmin) {
        navigate("/", { replace: true });
        return;
      }
    }
  }, [isInitialized, isAuthenticated, isAdmin, navigate]);

  // Show loading while checking auth state
  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return children;
};

export default ProtectedAdminRoute;
