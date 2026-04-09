#!/usr/bin/env pwsh
# Exam Seating System - Complete Setup Script for PowerShell
# Fixed version with proper quote escaping

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Exam Seating System - PowerShell Setup" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

$projectDir = "C:\Users\ms25h\Documents\seating"

function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

Write-Host "Step 0: Checking Prerequisites..." -ForegroundColor Yellow
Write-Host ""

if (Test-Command java) {
    Write-Host "OK - Java found" -ForegroundColor Green
    java -version 2>&1 | Select-Object -First 1
} else {
    Write-Host "ERROR - Java NOT found. Install Java 17+" -ForegroundColor Red
    exit 1
}

Write-Host ""

if (Test-Command mvn) {
    Write-Host "OK - Maven found" -ForegroundColor Green
} else {
    Write-Host "ERROR - Maven NOT found" -ForegroundColor Red
    exit 1
}

Write-Host ""

if (Test-Command node) {
    Write-Host "OK - Node.js found" -ForegroundColor Green
    node -v
} else {
    Write-Host "ERROR - Node.js NOT found" -ForegroundColor Red
    exit 1
}

Write-Host ""

if (Test-Command npm) {
    Write-Host "OK - npm found" -ForegroundColor Green
    npm -v
} else {
    Write-Host "ERROR - npm NOT found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Finding MySQL..." -ForegroundColor Yellow

$mysqlPaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.1\bin\mysql.exe",
    "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe"
)

$mysqlPath = $null
foreach ($path in $mysqlPaths) {
    if (Test-Path $path) {
        $mysqlPath = $path
        Write-Host "OK - MySQL found" -ForegroundColor Green
        break
    }
}

if (-not $mysqlPath) {
    Write-Host "ERROR - MySQL NOT found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "All prerequisites OK!" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Setting up Database..." -ForegroundColor Yellow

Write-Host "Enter MySQL root password (it will not show):" -ForegroundColor Cyan
$securePassword = Read-Host -AsSecureString
$password = [System.Net.NetworkCredential]::new("", $securePassword).Password

$schemaFile = "$projectDir\src\main\resources\schema.sql"

if (-not (Test-Path $schemaFile)) {
    Write-Host "ERROR - Schema file not found" -ForegroundColor Red
    exit 1
}

Write-Host "Running SQL setup..." -ForegroundColor Gray
$schemaContent = Get-Content $schemaFile -Raw
$schemaContent | & $mysqlPath -u root -p"$password" 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 1) {
    Write-Host "OK - Database ready" -ForegroundColor Green
} else {
    Write-Host "ERROR - Database setup failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "Step 2: Building Backend..." -ForegroundColor Yellow
Write-Host "This takes 2-3 minutes..." -ForegroundColor Gray

Set-Location $projectDir
mvn clean install -q 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "OK - Backend built" -ForegroundColor Green
} else {
    Write-Host "ERROR - Build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Installing Frontend..." -ForegroundColor Yellow

Set-Location "$projectDir\frontend"

if (-not (Test-Path "node_modules")) {
    npm install -q 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "OK - Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "ERROR - npm install failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "OK - Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT: Open 2 New PowerShell Windows and Run:" -ForegroundColor Cyan
Write-Host ""
Write-Host "WINDOW 1 (Backend):" -ForegroundColor Yellow
Write-Host "  cd C:\Users\ms25h\Documents\seating" -ForegroundColor Gray
Write-Host "  mvn spring-boot:run" -ForegroundColor Gray
Write-Host ""
Write-Host "WINDOW 2 (Frontend):" -ForegroundColor Yellow
Write-Host "  cd C:\Users\ms25h\Documents\seating\frontend" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "THEN: Open browser -> http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
