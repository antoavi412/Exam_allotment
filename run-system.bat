@echo off
REM Run Exam Seating System - Backend & Frontend
REM This batch file starts both servers in new windows

echo Starting Exam Seating System...
echo.

REM Start Backend in new window
echo Starting Backend Server (Port 8080)...
start cmd /k "cd C:\Users\ms25h\Documents\seating && mvn spring-boot:run"

REM Wait 5 seconds
timeout /t 5

REM Start Frontend in new window
echo Starting Frontend Server (Port 5173)...
start cmd /k "cd C:\Users\ms25h\Documents\seating\frontend && npm run dev"

REM Wait 3 seconds
timeout /t 3

echo.
echo ========================================
echo Systems starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo ========================================
echo.
pause
