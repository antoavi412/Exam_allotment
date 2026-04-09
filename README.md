<<<<<<< HEAD
# Exam Seating Arrangement & Invigilator Allocation System

A full-stack system for automatic exam seating arrangement and fair invigilator allocation using smart algorithms.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Backend Setup (Spring Boot)

1. **Database Setup**
   ```bash
   mysql -u root -p < src/main/resources/schema.sql
   ```
   Update `application.properties` with your MySQL credentials if needed.

2. **Build & Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   Backend runs on: `http://localhost:8080`

### Frontend Setup (React)

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

## 📚 Features

### Core Algorithms
1. **Interleaved Department Seating** - Students from different departments sit alternately to prevent copying
2. **Load-Balanced Invigilator Allocation** - Fair duty distribution with department conflict avoidance

### Pages
- **Dashboard** - System statistics overview
- **Student Management** - Add/view students
- **Hall Management** - Configure exam halls (rows × columns)
- **Invigilator Management** - Add/view invigilators
- **Exam Management** - Create exam records
- **Seating View** - Visual seat grid with student assignments
- **Invigilator Allocation** - Hall-wise invigilator assignments

## 🔌 API Endpoints

### Students
- `POST /api/students` - Add student
- `GET /api/students` - List all students

### Halls
- `POST /api/halls` - Add hall
- `GET /api/halls` - List all halls

### Invigilators
- `POST /api/invigilators` - Add invigilator
- `GET /api/invigilators` - List all invigilators

### Exams
- `POST /api/exams` - Create exam
- `GET /api/exams` - List all exams

### Seating (Core Algorithm)
- `POST /api/seating/generate/{examId}` - Generate seating for exam (sends hall IDs in body)
- `GET /api/seating/{examId}` - Get seating arrangement

### Invigilator Allocation (Core Algorithm)
- `POST /api/invigilator/allocate/{examId}` - Allocate invigilators (sends hall IDs in body)
- `GET /api/invigilator/allocation/{examId}` - Get allocations

## 🗄️ Database Schema

Tables created automatically:
- `students` - Student records
- `halls` - Exam halls with grid info
- `invigilators` - Invigilator records
- `exams` - Exam records
- `seating` - Seating assignments
- `invigilator_allocation` - Invigilator-to-hall mapping

Sample data pre-loaded for testing.

## 🧠 Algorithm Details

### Seating Algorithm
1. Fetch students for exam
2. Interleave by department (alternating CSE, ECE, MECH, etc.)
3. Assign sequentially to halls (row by row, column by column)
4. Seat format: StudentName | RollNumber | Seat (R#C#)

### Invigilator Allocation Algorithm
1. Sort invigilators by `assigned_count` (ascending) - load balanced
2. Prefer invigilators from different departments than exam department
3. Round-robin assign to halls
4. Update `assigned_count` after each assignment

## 🎨 Tech Stack
- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Spring Boot 3.2 + JPA/Hibernate
- **Database**: MySQL 8.0
- **Build**: Maven, npm

## 📝 Configuration

### application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/exam_seating
spring.datasource.username=root
spring.datasource.password=yourpassword
server.port=8080
```

### CORS
Configured to allow requests from `http://localhost:5173` (React frontend).

## 🧪 Testing

1. Add students via UI
2. Create exam halls
3. Add invigilators from different departments
4. Create an exam
5. Click "Generate Seating" - system will interleave students
6. Click "Allocate Invigilators" - system will load-balance
7. View results in visual grid

## 📦 Deployment

- Backend: `java -jar target/exam-seating-1.0.0.jar`
- Frontend: `npm run build` → deploy dist/ directory

## 📄 License
Academic use only

=======
# Exam_allotment
>>>>>>> 36a8d4172f80d479a95af7fe846afa2e5675274c
