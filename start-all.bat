@echo off
REM Complete startup script for Exam Seating System

echo =====================================
echo Exam Seating System - Complete Start
echo =====================================
echo.

REM Rebuild backend
echo Step 1: Rebuilding Backend...
cd C:\Users\ms25h\Documents\seating
call mvn clean install -q
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo OK - Build successful
echo.

REM Start Backend
echo Step 2: Starting Backend Server (Port 8080)...
start "Backend Server" cmd /k "cd C:\Users\ms25h\Documents\seating && mvn spring-boot:run"
timeout /t 5

REM Start Frontend
echo Step 3: Starting Frontend Server (Port 5173)...
start "Frontend Server" cmd /k "cd C:\Users\ms25h\Documents\seating\frontend && npm run dev"
timeout /t 3

echo.
echo =====================================
echo Systems Starting...
echo =====================================
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Wait 10 seconds for servers to fully start...
echo Then open: http://localhost:5173
echo =====================================
echo.
pause
