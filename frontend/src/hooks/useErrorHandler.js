import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const showError = useCallback((message, duration = 5000) => {
    setError(message);
    setTimeout(() => setError(null), duration);
  }, []);

  const showSuccess = useCallback((message, duration = 3000) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), duration);
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearSuccess = useCallback(() => setSuccess(null), []);

  const handleApiError = useCallback((error, operation = 'Operation') => {
    console.error(`${operation} error:`, error);
    
    let message = 'An unexpected error occurred';
    
    if (error.response?.status === 401) {
      message = 'Authentication required. Please log in again.';
    } else if (error.response?.status === 403) {
      message = 'Access denied. Admin privileges required.';
    } else if (error.response?.status === 404) {
      message = 'Resource not found.';
    } else if (error.response?.status === 500) {
      message = 'Server error. Please try again later.';
    } else if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }
    
    showError(message);
    return message;
  }, [showError]);

  return {
    error,
    success,
    showError,
    showSuccess,
    clearError,
    clearSuccess,
    handleApiError
  };
};





