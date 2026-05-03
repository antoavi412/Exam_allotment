# 🎯 Exam Seating System - Complete Setup Guide for Fresh Windows

**Target Audience**: Beginners with fresh Windows installation (Nothing installed)  
**Total Setup Time**: ~45 minutes  
**Difficulty**: Easy - Just follow step by step!

---

## 📋 Table of Contents
1. [Install Prerequisites](#1-install-prerequisites)
2. [Download & Prepare Project](#2-download--prepare-project)
3. [Setup MySQL Database](#3-setup-mysql-database)
4. [Build & Run Backend](#4-build--run-backend)
5. [Setup & Run Frontend](#5-setup--run-frontend)
6. [Access the Application](#6-access-the-application)
7. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Install Prerequisites

### A) Install Java (JDK 11 or higher)

1. **Download Java**
   - Go to: https://www.oracle.com/java/technologies/downloads/
   - Click on **"Java SE 17"** (or latest LTS version)
   - Choose **Windows x64 Installer** (`.exe` file)

2. **Install Java**
   - Double-click the downloaded `.exe` file
   - Click "Install" and follow the wizard
   - Choose default installation path (usually `C:\Program Files\Java\jdk-17`)
   - Wait for installation to complete

3. **Verify Java Installation**
   - Open Command Prompt (Press `Windows Key + R`, type `cmd`, press Enter)
   - Type: `java -version`
   - You should see: `java version "17.0.x"` or similar
   - ✅ If you see this, Java is installed correctly!

---

### B) Install Maven (Build Tool for Backend)

1. **Download Maven**
   - Go to: https://maven.apache.org/download.cgi
   - Download: **"apache-maven-3.9.x-bin.zip"** (Binary zip archive)

2. **Install Maven**
   - Extract the downloaded zip to: `C:\maven`
   - (Right-click zip → Extract All... → paste path `C:\maven`)

3. **Add Maven to System PATH**
   - Press `Windows Key` and search: **"Environment Variables"**
   - Click: **"Edit the system environment variables"**
   - Click button: **"Environment Variables"** (bottom right)
   - Under "System variables", click **"New"**
   - Variable name: `MAVEN_HOME`
   - Variable value: `C:\maven\apache-maven-3.9.x`
   - Click OK, OK, OK

4. **Add Maven bin to PATH**
   - In Environment Variables again:
   - Find variable called **"Path"** in System variables → Double-click
   - Click **"New"**
   - Add: `%MAVEN_HOME%\bin`
   - Click OK, OK, OK

5. **Verify Maven Installation**
   - Close Command Prompt (if open) and open a new one
   - Type: `mvn -version`
   - You should see Maven version info
   - ✅ If you see this, Maven is installed!

---

### C) Install Node.js (for Frontend)

1. **Download Node.js**
   - Go to: https://nodejs.org/
   - Download **LTS version** (Recommended)
   - Choose `.msi` installer for Windows

2. **Install Node.js**
   - Double-click the `.msi` file
   - Follow the wizard, accept defaults
   - Make sure **"npm"** is selected during installation
   - Complete installation

3. **Verify Node.js Installation**
   - Open Command Prompt
   - Type: `node -version`
   - Type: `npm -version`
   - ✅ You should see version numbers for both

---

### D) Install MySQL Server

1. **Download MySQL**
   - Go to: https://dev.mysql.com/downloads/mysql/
   - Download: **MySQL Community Server** (latest version)
   - Choose **Windows (x86, 64-bit), MSI Installer**

2. **Install MySQL**
   - Run the `.msi` installer
   - Choose **"Developer Default"** setup type
   - Continue through wizard
   - At "MySQL Server Configuration":
     - Port: `3306` (default)
     - Config Type: `Development Computer`
   - At "MySQL Server User Accounts":
     - Username: `root`
     - Password: `root` (or your choice - remember this!)
   - Click "Execute" and wait for configuration
   - Finish installation

3. **Verify MySQL Installation**
   - Open Command Prompt
   - Type: `mysql -u root -p`
   - Enter password when prompted (the one you set above)
   - You should see: `mysql>`
   - Type: `exit`
   - ✅ MySQL is ready!

---

### E) Install Git (Optional but Recommended)

1. **Download Git**
   - Go to: https://git-scm.com/download/win
   - Download the executable

2. **Install Git**
   - Run installer, accept defaults
   - Complete installation

---

## 2️⃣ Download & Prepare Project

### Option A: Using Git (Recommended)

```bash
# Open Command Prompt
cd C:\Users\YourUsername\Documents

# Clone the project
git clone https://github.com/your-repo/exam-seating.git
cd exam-seating
```

### Option B: Without Git

1. Download the project as ZIP from GitHub or from your instructor
2. Extract to: `C:\Users\YourUsername\Documents\exam-seating`
3. Open Command Prompt and navigate:
   ```bash
   cd C:\Users\YourUsername\Documents\exam-seating
   ```

---

## 3️⃣ Setup MySQL Database

### Step 1: Create Database

```bash
# Open Command Prompt and connect to MySQL
mysql -u root -p
# Enter your password (default: root)
```

You should see: `mysql>`

### Step 2: Run Database Schema

Copy and paste this entire script into MySQL:

```sql
CREATE DATABASE exam_seating;
USE exam_seating;

-- Create students table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL
);

-- Create halls table
CREATE TABLE halls (
    hall_id INT PRIMARY KEY AUTO_INCREMENT,
    hall_name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL
);

-- Create invigilators table
CREATE TABLE invigilators (
    invigilator_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    assigned_count INT DEFAULT 0
);

-- Create exams table
CREATE TABLE exams (
    exam_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_name VARCHAR(100) NOT NULL,
    exam_department VARCHAR(50) NOT NULL,
    exam_date DATE NOT NULL
);

-- Create seating table
CREATE TABLE seating (
    seating_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id INT NOT NULL,
    hall_id INT NOT NULL,
    seat_number INT NOT NULL,
    student_id INT,
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (hall_id) REFERENCES halls(hall_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Create invigilator_allocation table
CREATE TABLE invigilator_allocation (
    allocation_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id INT NOT NULL,
    hall_id INT NOT NULL,
    invigilator_id INT NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (hall_id) REFERENCES halls(hall_id),
    FOREIGN KEY (invigilator_id) REFERENCES invigilators(invigilator_id)
);

-- Insert sample students
INSERT INTO students (name, roll_number, department) VALUES
('Alice Kumar', 'CSE001', 'CSE'),
('Bob Singh', 'CSE002', 'CSE'),
('Carol Patel', 'ECE001', 'ECE'),
('David Rao', 'ECE002', 'ECE'),
('Eve Sharma', 'MECH001', 'MECH');

-- Insert sample halls
INSERT INTO halls (hall_name, capacity) VALUES
('Hall A', 3),
('Hall B', 2);

-- Insert sample invigilators
INSERT INTO invigilators (name, department, assigned_count) VALUES
('Prof. Gupta', 'CSE', 0),
('Prof. Nair', 'ECE', 0),
('Prof. Verma', 'MECH', 0),
('Prof. Iyer', 'ADMIN', 0),
('Prof. Chopra', 'ADMIN', 0);

-- Insert sample exams
INSERT INTO exams (exam_name, exam_department, exam_date) VALUES
('Data Structures', 'CSE', '2024-12-15'),
('Digital Systems', 'ECE', '2024-12-16');
```

### Step 3: Verify Database

```sql
SHOW DATABASES;
USE exam_seating;
SHOW TABLES;
SELECT COUNT(*) FROM students;
```

You should see:
- 6 tables listed
- 5 students in the database

Type: `exit` to leave MySQL

✅ **Database is ready!**

---

## 4️⃣ Build & Run Backend

### Step 1: Navigate to Project Folder

```bash
# Open Command Prompt
cd C:\Users\YourUsername\Documents\exam-seating
```

### Step 2: Check application.properties

Open the file: `src/main/resources/application.properties`

Make sure it contains:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/exam_seating
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

If `password` is different (you set it differently in MySQL), update it here.

### Step 3: Build Backend

```bash
mvn clean install
```

Wait for it to complete. You should see: **BUILD SUCCESS**

⏱️ This takes 2-5 minutes the first time.

### Step 4: Start Backend Server

```bash
mvn spring-boot:run
```

Wait for message: **"Started ExamSeatingApplication in X.XXX seconds"**

You should see: **"Server running on http://localhost:8080"**

✅ **Keep this Command Prompt window open** (Backend is running!)

---

## 5️⃣ Setup & Run Frontend

### Step 1: Open New Command Prompt

- Press `Windows Key + R`
- Type `cmd`
- Press Enter (new Command Prompt window)

### Step 2: Navigate to Frontend Folder

```bash
cd C:\Users\YourUsername\Documents\exam-seating\frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

Wait for all packages to install. ⏱️ This takes 2-3 minutes.

You should see: **"added XX packages"**

### Step 4: Start Frontend Server

```bash
npm run dev
```

You should see something like:
```
  VITE v4.4.9  ready in XXX ms
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Keep this window open too!** (Frontend is running!)

---

## 6️⃣ Access the Application

### Open Your Browser

1. **Open any web browser** (Chrome, Firefox, Edge, etc.)
2. **Go to**: `http://localhost:5173`
3. **You should see**: 
   - Navy blue navbar with "Exam Seating System"
   - Dashboard showing:
     - 5 Students
     - 2 Halls
     - 2 Exams
     - 5 Invigilators

✅ **Application is running!**

---

## 🧪 Test the Features

### Test 1: View Dashboard
- You're already on the Dashboard tab
- See all students, halls, and exams listed ✅

### Test 2: Generate Seating
1. Click **"Seating"** tab (left menu)
2. Click dropdown: **"Select Exam"**
3. Choose: **"Data Structures"**
4. Click button: **"Generate Seating"**
5. You should see a grid of seats with student names ✅

### Test 3: Allocate Invigilators
1. Click **"Allocations"** tab (left menu)
2. Click dropdown: **"Select Exam"**
3. Choose: **"Data Structures"**
4. Click button: **"Allocate Invigilators"**
5. You should see a table showing which invigilator is assigned to which hall ✅

**If all tests pass, congratulations! 🎉 Your system is working perfectly!**

---

## 📝 How to Stop Everything

When you're done testing:

1. **Stop Backend** (in first Command Prompt)
   - Press `Ctrl + C`
   - Type `Y` and press Enter

2. **Stop Frontend** (in second Command Prompt)
   - Press `Ctrl + C`
   - Type `Y` and press Enter

---

## 🔧 Troubleshooting

### Problem: "mysql: command not found"
**Solution**: MySQL is not in system PATH. Restart Command Prompt after MySQL installation.

### Problem: "java: command not found"
**Solution**: Java PATH not set. Restart Command Prompt after Java installation, or add Java to Environment Variables.

### Problem: "mvn: command not found"
**Solution**: Maven PATH not set. Verify `MAVEN_HOME` and Path variables (see Step 1.B.3-4).

### Problem: "Port 3306 already in use"
**Solution**: MySQL already running or another app using port. Close MySQL and start again.

### Problem: "CORS error" in browser console
**Solution**: Backend and frontend must be running. Check both Command Prompts are showing "running" messages.

### Problem: "Cannot connect to database"
**Solution**: 
1. Check MySQL is running: `mysql -u root -p` in Command Prompt
2. Check username/password in `src/main/resources/application.properties`
3. Check database exists: `SHOW DATABASES;` in MySQL

### Problem: "npm ERR! 404 Not Found"
**Solution**: 
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: "Port 8080 already in use"
**Solution**: Backend port is taken. Kill process or restart computer.

### Problem: "Port 5173 already in use"
**Solution**: Frontend port is taken. Specify different port:
```bash
npm run dev -- --port 5174
```

---

## 📱 If Running on Different Machine

If your friend is on a **different computer** on the same network:

### Backend - Make it accessible:
Edit `src/main/resources/application.properties`:
```properties
server.address=0.0.0.0
```

Rebuild and restart backend.

### Frontend - Connect to different backend:
Edit `frontend/src/api/axios.js`:
```javascript
const API = axios.create({
    baseURL: 'http://YOUR_COMPUTER_IP:8080/api'
});
```

Replace `YOUR_COMPUTER_IP` with backend computer's IP address (find with `ipconfig` in Command Prompt).

Start frontend normally.

---

## ✅ Quick Checklist

- [ ] Java installed and `java -version` works
- [ ] Maven installed and `mvn -version` works
- [ ] Node.js installed and `npm -version` works
- [ ] MySQL installed and running
- [ ] Database created with schema
- [ ] Backend built with `mvn clean install`
- [ ] Backend running with `mvn spring-boot:run`
- [ ] Frontend dependencies installed with `npm install`
- [ ] Frontend running with `npm run dev`
- [ ] Browser shows dashboard at `http://localhost:5173`
- [ ] Can generate seating and allocate invigilators

**If all checkmarks are done, you're ready to go! 🚀**

---

## 📞 Need Help?

If something doesn't work:
1. Check the **Troubleshooting** section above
2. Make sure both Command Prompts show "running" messages
3. Check browser console for errors (Press F12)
4. Verify MySQL is running and database exists
5. Check `application.properties` has correct MySQL credentials

---

## 🎓 Next Steps (Optional)

Once everything is working:
1. **Add more data**: Add students/halls/exams using the UI forms
2. **Customize algorithms**: Modify `SeatingService.java` and `InvigilatorAllocationService.java`
3. **Deploy to cloud**: Use services like AWS, Azure, or Heroku

---

**Happy testing! 🎉**
