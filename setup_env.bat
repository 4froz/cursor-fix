@echo off
echo 🔐 Verre Environment Setup Script
echo ==================================
echo.

REM Check if running from project root
if not exist "frontend" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)
if not exist "backend" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo 📁 Setting up environment files...
echo.

REM Frontend setup
echo 🖥️  Setting up Frontend environment...
if not exist "frontend\.env.local" (
    copy "frontend\env.example" "frontend\.env.local"
    echo ✅ Created frontend\.env.local
    echo ⚠️  Please edit frontend\.env.local with your actual API keys
) else (
    echo ℹ️  frontend\.env.local already exists
)

REM Backend setup
echo.
echo ⚙️  Setting up Backend environment...
if not exist "backend\.env" (
    copy "backend\env.secure.example" "backend\.env"
    echo ✅ Created backend\.env
    echo ⚠️  Please edit backend\.env with your actual API keys
) else (
    echo ℹ️  backend\.env already exists
)

echo.
echo 📦 Installing dependencies...

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install express-rate-limit
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ✅ Environment setup complete!
echo.
echo 🚨 IMPORTANT NEXT STEPS:
echo 1. Edit frontend\.env.local with your actual API keys
echo 2. Edit backend\.env with your actual API keys
echo 3. Generate NEW API keys for all services (current ones are exposed!)
echo 4. Test the application with: npm run dev (in both directories)
echo.
echo 📖 See SETUP_ENVIRONMENT.md for detailed instructions
echo 🔒 See SECURITY_CHECKLIST.md for security requirements
echo.
pause

