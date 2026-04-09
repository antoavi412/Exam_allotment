@echo off
REM Start Backend Server
REM Run this in a command prompt or PowerShell

cd C:\Users\ms25h\Documents\seating
echo Starting Backend Server on http://localhost:8080
echo Press Ctrl+C to stop
mvn spring-boot:run
pause
