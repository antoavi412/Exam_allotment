CREATE DATABASE IF NOT EXISTS exam_seating;
USE exam_seating;

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  roll_number VARCHAR(20) UNIQUE,
  department VARCHAR(50),
  semester INT
);

-- Exam Halls (with backticks for reserved words)
CREATE TABLE IF NOT EXISTS halls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hall_name VARCHAR(50),
  capacity INT,
  `rows` INT,
  `columns` INT
);

-- Invigilators
CREATE TABLE IF NOT EXISTS invigilators (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invigilator_name VARCHAR(100),
  department VARCHAR(50),
  assigned_count INT DEFAULT 0
);

-- Exams
CREATE TABLE IF NOT EXISTS exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(100),
  exam_date DATE,
  exam_time VARCHAR(20),
  department VARCHAR(50),
  semester INT
);

-- Seating Arrangement
CREATE TABLE IF NOT EXISTS seating (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT,
  student_id INT,
  hall_id INT,
  seat_number VARCHAR(10),
  FOREIGN KEY (exam_id) REFERENCES exams(id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (hall_id) REFERENCES halls(id)
);

-- Invigilator Allocation
CREATE TABLE IF NOT EXISTS invigilator_allocation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT,
  hall_id INT,
  invigilator_id INT,
  FOREIGN KEY (exam_id) REFERENCES exams(id),
  FOREIGN KEY (hall_id) REFERENCES halls(id),
  FOREIGN KEY (invigilator_id) REFERENCES invigilators(id)
);

-- Sample Data - Students
INSERT INTO students (student_name, roll_number, department, semester) VALUES
('Arun Kumar', 'CSE001', 'CSE', 4),
('Priya Singh', 'CSE002', 'CSE', 4),
('Raj Patel', 'ECE001', 'ECE', 4),
('Neha Verma', 'ECE002', 'ECE', 4),
('Vikram Sharma', 'MECH001', 'MECH', 4);

-- Sample Data - Halls (with backticks)
INSERT INTO halls (hall_name, capacity, `rows`, `columns`) VALUES
('Hall A', 6, 2, 3),
('Hall B', 6, 2, 3);

-- Sample Data - Invigilators
INSERT INTO invigilators (invigilator_name, department, assigned_count) VALUES
('Dr. Amit Kumar', 'CSE', 0),
('Dr. Bhavna Patel', 'ECE', 0),
('Dr. Chetan Singh', 'MECH', 0),
('Prof. Divya Sharma', 'CSE', 0),
('Prof. Esha Verma', 'ECE', 0);

-- Sample Data - Exams
INSERT INTO exams (subject_name, exam_date, exam_time, department, semester) VALUES
('Data Structures', '2026-04-09', '09:00 AM', 'CSE', 4),
('Digital Electronics', '2026-04-10', '02:00 PM', 'ECE', 4);
