// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
import authReducer, { setCredentials, setInitialized } from "./authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // ✅ adjust path to your Firebase config

// Utility function to safely load from localStorage
const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ? JSON.parse(serializedState) : defaultValue;
  } catch (err) {
    console.error(`Could not load ${key} from localStorage:`, err);
    localStorage.removeItem(key);
    return defaultValue;
  }
};

// Load initial states from localStorage
const cartFromStorage = loadFromLocalStorage("cart", []);
const userFromStorage = loadFromLocalStorage("userInfo", null);

// ⚠️ Removed firebaseTokenFromStorage — don’t preload expired tokens
// const firebaseTokenFromStorage = loadFromLocalStorage("firebaseToken", null);

// Preloaded state with proper structure
const preloadedState = {
  cart: {
    items: cartFromStorage,
  },
  auth: {
    user: userFromStorage,
    firebaseToken: null, // always start null
    isLoading: false,
    error: null,
    isInitialized: false, // will be set by Firebase SDK
  },
  modal: {
    isCartModalOpen: false,
    succesModal: null, // null or { orderId: '123' }
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    auth: authReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/setFirebaseToken",
          "auth/refreshToken",
          "auth/setCredentials",
        ],
        ignoredPaths: ["auth.firebaseToken"],
      },
    }),
      devTools: import.meta.env.MODE !== "production",
});

// ✅ Persistence with proper error handling
store.subscribe(() => {
  try {
    const { cart, auth } = store.getState();

    if (cart?.items) {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    }

    if (auth?.user) {
      localStorage.setItem("userInfo", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("userInfo");
    }

    // ⚠️ Removed firebaseToken persistence — Firebase SDK manages it
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
});

// ✅ Bootstrap Firebase auth state
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const token = await firebaseUser.getIdToken();
    const userData = store.getState().auth.user || null;
    store.dispatch(setCredentials({ user: userData, firebaseToken: token }));
  } else {
    store.dispatch(setCredentials({ user: null, firebaseToken: null }));
  }
  store.dispatch(setInitialized(true));
});

// Helpers
export const clearAuthStorage = () => {
  try {
    localStorage.removeItem("userInfo");
  } catch (err) {
    console.error("Failed to clear auth storage:", err);
  }
};

export const clearAllStorage = () => {
  try {
    localStorage.removeItem("cart");
    localStorage.removeItem("userInfo");
  } catch (err) {
    console.error("Failed to clear storage:", err);
  }
};

export default store;
