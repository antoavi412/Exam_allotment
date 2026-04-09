-- Create database
CREATE DATABASE IF NOT EXISTS exam_seating;
USE exam_seating;

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  roll_number VARCHAR(20) UNIQUE NOT NULL,
  department VARCHAR(50) NOT NULL,
  semester INT NOT NULL
);

-- Exam Halls table
CREATE TABLE IF NOT EXISTS halls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hall_name VARCHAR(50) NOT NULL,
  capacity INT NOT NULL,
   row_count NOT NULL,
   col_count NOT NULL
);

-- Invigilators table
CREATE TABLE IF NOT EXISTS invigilators (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invigilator_name VARCHAR(100) NOT NULL,
  department VARCHAR(50) NOT NULL,
  assigned_count INT DEFAULT 0
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL,
  exam_date DATE NOT NULL,
  exam_time VARCHAR(20) NOT NULL,
  department VARCHAR(50) NOT NULL,
  semester INT NOT NULL
);

-- Seating Arrangement table
CREATE TABLE IF NOT EXISTS seating (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT NOT NULL,
  student_id INT NOT NULL,
  hall_id INT NOT NULL,
  seat_number VARCHAR(10),
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (hall_id) REFERENCES halls(id)
);

-- Invigilator Allocation table
CREATE TABLE IF NOT EXISTS invigilator_allocation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT NOT NULL,
  hall_id INT NOT NULL,
  invigilator_id INT NOT NULL,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  FOREIGN KEY (hall_id) REFERENCES halls(id),
  FOREIGN KEY (invigilator_id) REFERENCES invigilators(id)
);

-- Sample data
INSERT INTO students (student_name, roll_number, department, semester) VALUES
('John Doe', 'CSE001', 'CSE', 6),
('Jane Smith', 'CSE002', 'CSE', 6),
('Alice Johnson', 'ECE001', 'ECE', 6),
('Bob Wilson', 'ECE002', 'ECE', 6),
('Charlie Brown', 'MECH001', 'MECH', 6),
('Diana Prince', 'MECH002', 'MECH', 6),
('Eve Davis', 'CSE003', 'CSE', 6),
('Frank Miller', 'ECE003', 'ECE', 6);

INSERT INTO halls (hall_name, capacity, rows, columns) VALUES
('Hall A', 12, 3, 4),
('Hall B', 12, 3, 4);

INSERT INTO invigilators (invigilator_name, department, assigned_count) VALUES
('Prof. Kumar', 'CSE', 0),
('Prof. Singh', 'ECE', 0),
('Prof. Sharma', 'MECH', 0),
('Prof. Patel', 'CSE', 0);
