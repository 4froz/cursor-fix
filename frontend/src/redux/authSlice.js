// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper functions for secure user data storage
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user;
    }
  } catch (error) {
    console.error('Error parsing stored user:', error);
    localStorage.removeItem('userInfo');
  }
  return null;
};

// Helper function to get Firebase token (handled by Firebase SDK)
const getFirebaseToken = () => {
  try {
    // Firebase token is managed by Firebase SDK
    // We don't store it in localStorage for security
    return localStorage.getItem('firebaseToken');
  } catch (error) {
    console.error('Error getting Firebase token:', error);
  }
  return null;
};

const initialState = {
  user: getStoredUser(), // MongoDB user data
  firebaseToken: null, // Firebase ID token (managed separately)
  isLoading: false,
  error: null,
  isInitialized: false, // Track if Firebase auth state is loaded
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null; // Clear error when loading starts
      }
    },
    
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    
    setCredentials: (state, action) => {
      const { user, firebaseToken } = action.payload;
      
      state.user = user;
      state.firebaseToken = firebaseToken;
      state.isLoading = false;
      state.error = null;
      state.isInitialized = true;
      
      // Store user data in localStorage (not the token)
      if (user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
      }
      
      // Store Firebase token temporarily (Firebase SDK manages this better)
      if (firebaseToken) {
        localStorage.setItem('firebaseToken', firebaseToken);
      }
    },
    
    setFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload;
      
      if (action.payload) {
        localStorage.setItem('firebaseToken', action.payload);
      } else {
        localStorage.removeItem('firebaseToken');
      }
    },
    
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      
      if (action.payload) {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('userInfo');
      }
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    clearCredentials: (state) => {
      state.user = null;
      state.firebaseToken = null;
      state.isLoading = false;
      state.error = null;
      state.isInitialized = true;
      
      // Clear from localStorage
      localStorage.removeItem('userInfo');
      localStorage.removeItem('firebaseToken');
    },
    
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('userInfo', JSON.stringify(state.user));
      }
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Handle token refresh
    refreshToken: (state, action) => {
      state.firebaseToken = action.payload;
      if (action.payload) {
        localStorage.setItem('firebaseToken', action.payload);
      }
    },
  },
});

export const { 
  setLoading,
  setInitialized,
  setCredentials, 
  setFirebaseToken,
  setUser,
  setError,
  clearCredentials,
  updateUser,
  clearError,
  refreshToken
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectFirebaseToken = (state) => state.auth.firebaseToken;
export const selectIsAuthenticated = (state) => !!(state.auth.user && state.auth.firebaseToken);
export const selectIsAdmin = (state) => state.auth.user?.isAdmin || false;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsInitialized = (state) => state.auth.isInitialized;

// Additional useful selectors
export const selectUserName = (state) => state.auth.user?.name || '';
export const selectUserEmail = (state) => state.auth.user?.email || '';
export const selectFirebaseUID = (state) => state.auth.user?.firebaseUID || '';

export default authSlice.reducer;