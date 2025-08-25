// Frontend configuration file
// This file should be updated with your actual values

const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:7000',
  
  // Firebase Configuration
  FIREBASE: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  },
  
  // Supabase Configuration
  SUPABASE: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  },
  
  // App Configuration
  APP: {
    name: 'Verre',
    version: '1.0.0',
    description: 'Redefining hydration through innovative design and uncompromising quality',
    contactEmail: 'info@verre.com',
    supportEmail: 'support@verre.com'
  },
  
  // Payment Configuration
  PAYMENT: {
    currency: 'INR',
    supportedMethods: ['Razorpay', 'COD'],
    deliveryOptions: {
      regular: { price: 70, time: '5-7 days' },
      express: { price: 140, time: '2-3 days' }
    }
  },
  
  // Feature Flags
  FEATURES: {
    enableAnalytics: import.meta.env.MODE === 'production',
    enableErrorReporting: import.meta.env.MODE === 'production',
    enablePerformanceMonitoring: import.meta.env.MODE === 'production'
  },
  
  // Validation Rules
  VALIDATION: {
    minPasswordLength: 8,
    maxNameLength: 50,
    maxAddressLength: 200,
    maxPhoneLength: 15
  }
};

export default config;
