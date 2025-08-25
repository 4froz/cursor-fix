#!/bin/bash

echo "🔐 Verre Environment Setup Script"
echo "=================================="
echo ""

# Check if running from project root
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📁 Setting up environment files..."
echo ""

# Frontend setup
echo "🖥️  Setting up Frontend environment..."
if [ ! -f "frontend/.env.local" ]; then
    cp frontend/env.example frontend/.env.local
    echo "✅ Created frontend/.env.local"
    echo "⚠️  Please edit frontend/.env.local with your actual API keys"
else
    echo "ℹ️  frontend/.env.local already exists"
fi

# Backend setup
echo ""
echo "⚙️  Setting up Backend environment..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.secure.example backend/.env
    echo "✅ Created backend/.env"
    echo "⚠️  Please edit backend/.env with your actual API keys"
else
    echo "ℹ️  backend/.env already exists"
fi

echo ""
echo "📦 Installing dependencies..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install express-rate-limit
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Environment setup complete!"
echo ""
echo "🚨 IMPORTANT NEXT STEPS:"
echo "1. Edit frontend/.env.local with your actual API keys"
echo "2. Edit backend/.env with your actual API keys"
echo "3. Generate NEW API keys for all services (current ones are exposed!)"
echo "4. Test the application with: npm run dev (in both directories)"
echo ""
echo "📖 See SETUP_ENVIRONMENT.md for detailed instructions"
echo "🔒 See SECURITY_CHECKLIST.md for security requirements"

