# 🚀 Verre - Premium Water Bottle E-commerce Platform

A modern, secure, and scalable e-commerce platform built with React, Node.js, and MongoDB for the premium water bottle brand "Verre".

## ✨ Features

- **🛍️ E-commerce**: Complete shopping experience with cart, checkout, and order management
- **🔐 Authentication**: Secure Firebase-based authentication system
- **💳 Payments**: Razorpay integration with secure payment processing
- **📱 Responsive**: Mobile-first design with Tailwind CSS
- **⚡ Performance**: Optimized with Vite and modern React patterns
- **🔒 Security**: Rate limiting, CORS protection, and secure middleware
- **📊 Admin Panel**: Comprehensive admin dashboard for product and order management

## 🏗️ Architecture

```
verre/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express + MongoDB
├── docs/             # Documentation and setup guides
└── README.md         # This file
```

## 🚨 Security Features

- **Rate Limiting**: Prevents API abuse and brute force attacks
- **CORS Protection**: Secure cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs
- **Authentication**: Firebase-based secure authentication
- **Payment Security**: Razorpay webhook verification
- **Environment Variables**: Secure configuration management

## 🛠️ Prerequisites

- Node.js 18+ 
- MongoDB 6+
- Firebase project
- Razorpay account
- Supabase account (for image uploads)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/verre.git
cd verre
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.secure.example .env

# Edit .env with your actual values
nano .env

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your actual values
nano .env.local

# Start development server
npm run dev
```

## 🔐 Environment Configuration

### Backend (.env)

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/verre_store

# Razorpay
RAZORPAY_TEST_KEY_ID=your_test_key_id
RAZORPAY_TEST_KEY_SECRET=your_test_key_secret

# Firebase
FIREBASE_SERVICE_ACCOUNT_PATH=./path-to-firebase-key.json

# Security
JWT_SECRET=your_strong_jwt_secret_here
```

### Frontend (.env.local)

```bash
# API
REACT_APP_API_BASE_URL=http://localhost:7000

# Firebase
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com

# Supabase
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Backend Deployment**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Frontend Deployment**
   ```bash
   cd frontend
   vercel --prod
   ```

### Manual Deployment

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   npm run build
   # Deploy to your preferred hosting service
   ```

## 🔒 Security Checklist

- [ ] Change all default passwords and API keys
- [ ] Set up proper CORS origins for production
- [ ] Enable rate limiting in production
- [ ] Set up SSL/TLS certificates
- [ ] Configure Firebase security rules
- [ ] Set up MongoDB authentication
- [ ] Enable webhook signature verification
- [ ] Set up proper logging and monitoring

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📊 Performance Monitoring

- **Frontend**: React DevTools, Lighthouse
- **Backend**: Node.js monitoring, MongoDB performance
- **Database**: MongoDB Compass, Atlas monitoring
- **Payment**: Razorpay dashboard analytics

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS configuration in backend
2. **Database Connection**: Verify MongoDB URI and network access
3. **Payment Issues**: Check Razorpay keys and webhook configuration
4. **Authentication**: Verify Firebase configuration

### Debug Mode

```bash
# Backend debug
DEBUG=true npm run dev

# Frontend debug
REACT_APP_DEBUG=true npm run dev
```

## 📚 API Documentation

### Base URL
```
Development: http://localhost:7000
Production: https://your-domain.com
```

### Endpoints

- `GET /api/products` - Get all products
- `POST /api/orders` - Create new order
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Email**: support@verre.com
- **Documentation**: [docs.verre.com](https://docs.verre.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/verre/issues)

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release
- Complete e-commerce functionality
- Admin panel
- Payment integration
- Responsive design

## ⚠️ Important Notes

- **Never commit API keys or secrets to version control**
- **Always use environment variables for sensitive data**
- **Test thoroughly before deploying to production**
- **Keep dependencies updated for security patches**
- **Monitor application performance and errors**

---

Built with ❤️ by the Verre Team

