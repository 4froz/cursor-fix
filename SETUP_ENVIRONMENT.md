# 🔐 Environment Setup Guide - Remove Hardcoded Keys

This guide will help you move all hardcoded API keys to environment variables for security.

## 🚨 **IMMEDIATE ACTION REQUIRED**

**Your current API keys are exposed in the source code and MUST be changed immediately!**

## 📁 **Files to Update**

### 1. **Frontend Environment Setup**

Create `.env.local` in the `frontend/` directory:

```bash
cd frontend
cp env.example .env.local
```

Edit `.env.local` with your actual values:

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:7000

# Firebase Configuration (REPLACE WITH YOUR ACTUAL VALUES)
REACT_APP_FIREBASE_API_KEY=AIzaSyAHkyYOufLhh-esB1PcG3Pdr-xzcQeyWuA
REACT_APP_FIREBASE_AUTH_DOMAIN=verre-8c17b.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=verre-8c17b
REACT_APP_FIREBASE_STORAGE_BUCKET=verre-8c17b.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=992660234878
REACT_APP_FIREBASE_APP_ID=1:992660234878:web:b4ee33e3ed987e67c22e2f

# Supabase Configuration (REPLACE WITH YOUR ACTUAL VALUES)
REACT_APP_SUPABASE_URL=https://qnrfiuwkpglhgppemleo.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucmZpdXdrcGdsaGdwcGVtbGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjM1OTYsImV4cCI6MjA3MTQzOTU5Nn0.vzeFLvAJ4Ali067MRyrr91y-5iar_9VTkmpHVFsiB-g

# App Configuration
REACT_APP_APP_NAME=Verre
REACT_APP_APP_VERSION=1.0.0
REACT_APP_CONTACT_EMAIL=info@verre.com
REACT_APP_SUPPORT_EMAIL=support@verre.com
```

### 2. **Backend Environment Setup**

Create `.env` in the `backend/` directory:

```bash
cd backend
cp env.secure.example .env
```

Edit `.env` with your actual values:

```bash
# Node Environment
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/verre_store

# Razorpay Configuration (REPLACE WITH YOUR ACTUAL VALUES)
RAZORPAY_TEST_KEY_ID=rzp_test_fF62bDmx4cqklg
RAZORPAY_TEST_KEY_SECRET=WffXVbsaZFNln6vHFnk4YGqq
RAZORPAY_TEST_WEBHOOK_SECRET=12345678

# Email Configuration
RESEND_API_KEY=re_Q3EhWcGE_KQeAF3smtfju5E64iZEPQATa
ADMIN_EMAIL=evara.webdesign@gmail.com

# Frontend URLs
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000

# Server Configuration
PORT=7000
HOST=localhost

# Security (GENERATE NEW STRONG SECRETS)
JWT_SECRET=16865435eddjhuo@$^HW@%&
SESSION_SECRET=your_session_secret_here

# Firebase Configuration
FIREBASE_SERVICE_ACCOUNT_PATH=./verre-8c17b-firebase-adminsdk-fbsvc-a7dc2802b3.json

# Supabase Configuration
SUPABASE_URL=https://qnrfiuwkpglhgppemleo.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucmZpdXdrcGdsaGdwcGVtbGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NjM1OTYsImV4cCI6MjA3MTQzOTU5Nn0.vzeFLvAJ4Ali067MRyrr91y-5iar_9VTkmpHVFsiB-g
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# SMS Configuration
FAST_2_SMS_KEY=v8fXUspj6x4QbOToVwWdNLqgG9YZlR7yhknumHFDecPr5zEMA2

# PayPal Configuration
PAYPAL_CLIENT_ID=AZL3kuZskzqcfdnGW1CQRUuv-NyeQSF_fMRI2SuuaxahWWuxQSh4iRvuLzsdA2pQhBjOPj27EZbybyG7

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔑 **Generate New API Keys (CRITICAL)**

### 1. **Firebase**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project
- Go to Project Settings > General
- Generate new API keys
- Update your `.env.local` file

### 2. **Supabase**
- Go to [Supabase Dashboard](https://supabase.com/dashboard)
- Select your project
- Go to Settings > API
- Generate new API keys
- Update your `.env.local` file

### 3. **Razorpay**
- Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Go to Settings > API Keys
- Generate new test keys
- Update your `.env` file

### 4. **Generate Strong Secrets**
```bash
# Generate JWT secret (32+ characters)
openssl rand -base64 32

# Generate session secret
openssl rand -base64 32
```

## 🚀 **Install Dependencies**

### Backend
```bash
cd backend
npm install express-rate-limit
```

### Frontend
```bash
cd frontend
npm install
```

## ✅ **Verification Steps**

1. **Check Environment Files**
   - Ensure `.env` exists in `backend/`
   - Ensure `.env.local` exists in `frontend/`
   - Verify no hardcoded keys remain in source code

2. **Test Configuration**
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend
   cd frontend && npm run dev
   ```

3. **Verify Security**
   - Check that no API keys appear in browser console
   - Verify backend starts without hardcoded key errors
   - Test authentication and payment flows

## 🚨 **Security Checklist**

- [ ] All hardcoded API keys removed from source code
- [ ] New API keys generated for all services
- [ ] Environment files created and configured
- [ ] `.env` and `.env.local` added to `.gitignore`
- [ ] Dependencies installed
- [ ] Application tested with new configuration
- [ ] Old API keys revoked/deactivated

## ⚠️ **Important Notes**

1. **NEVER commit `.env` files to version control**
2. **Generate new API keys for production**
3. **Use different keys for development and production**
4. **Rotate keys regularly for security**
5. **Monitor for unauthorized usage of old keys**

## 🔍 **Troubleshooting**

### Common Issues

1. **"API key not found" errors**
   - Check environment variable names
   - Ensure `.env` files are in correct locations
   - Restart development servers after changes

2. **CORS errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check CORS configuration in `backend/api.js`

3. **Database connection errors**
   - Verify `MONGODB_URI` in backend `.env`
   - Check MongoDB service is running

## 📞 **Support**

If you encounter issues:
1. Check the error logs
2. Verify environment variable names
3. Ensure all dependencies are installed
4. Restart both frontend and backend servers

---

**Remember**: Security is paramount. Take the time to properly configure your environment variables and never expose API keys in your source code.

