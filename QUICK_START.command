#!/bin/bash
# Quick Start Script for Exam Seating System

echo "============================================"
echo "Exam Seating System - Quick Start"
echo "============================================"
echo ""

# Check if MySQL is accessible
echo "1. Checking MySQL connection..."
mysql -u root -p -e "SELECT 1;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "   ✓ MySQL connected"
    echo "2. Setting up database..."
    mysql -u root -p < src/main/resources/schema.sql
    echo "   ✓ Database created with sample data"
else
    echo "   ✗ MySQL not accessible. Please ensure MySQL is running."
    echo "   Update connection in src/main/resources/application.properties"
    exit 1
fi

echo ""
echo "3. Building backend with Maven..."
mvn clean install

if [ $? -eq 0 ]; then
    echo "   ✓ Backend built successfully"
else
    echo "   ✗ Build failed. Check Maven output above."
    exit 1
fi

echo ""
echo "4. Installing frontend dependencies..."
cd frontend
npm install

if [ $? -eq 0 ]; then
    echo "   ✓ Frontend dependencies installed"
else
    echo "   ✗ npm install failed"
    exit 1
fi

echo ""
echo "============================================"
echo "Setup Complete!"
echo "============================================"
echo ""
echo "Next Steps:"
echo "  Terminal 1 (Backend):"
echo "    cd c:/Users/ms25h/Documents/seating"
echo "    mvn spring-boot:run"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd c:/Users/ms25h/Documents/seating/frontend"
echo "    npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
