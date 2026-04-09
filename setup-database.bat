@echo off
REM Setup Database for Exam Seating System
REM Just double-click this file

echo Setting up MySQL Database...
echo.

cd C:\Users\ms25h\Documents\seating

REM Path to MySQL
set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe

REM Create database and import schema
echo Please enter your MySQL root password when prompted:
echo.

"%MYSQL_PATH%" -u root -p < src\main\resources\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Database created.
    echo.
    pause
) else (
    echo.
    echo ERROR! Check your password and try again.
    echo.
    pause
)
