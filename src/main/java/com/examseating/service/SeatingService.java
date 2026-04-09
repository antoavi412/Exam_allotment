package com.examseating.service;

import com.examseating.model.*;
import com.examseating.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SeatingService {
    @Autowired
    private SeatingRepository seatingRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private HallRepository hallRepository;

    public List<Seating> generateSeating(Integer examId, List<Integer> hallIds) {
        Exam exam = examRepository.findById(examId).orElse(null);
        if (exam == null) return new ArrayList<>();

        // Delete existing seating for this exam
        List<Seating> existingSeating = seatingRepository.findByExamId(examId);
        seatingRepository.deleteAll(existingSeating);

        // Fetch all students - in a real system, filter by exam enrollment
        List<Student> students = studentRepository.findAll();

        // Interleave students by department
        List<Student> interleavedStudents = interleaveByDepartment(students);

        List<Seating> newSeating = new ArrayList<>();
        int studentIndex = 0;

        // Assign to halls
        for (Integer hallId : hallIds) {
            Hall hall = hallRepository.findById(hallId).orElse(null);
            if (hall == null) continue;

            int seatIndex = 0;
            for (int row = 1; row <= hall.getRows(); row++) {
                for (int col = 1; col <= hall.getColumns(); col++) {
                    if (studentIndex >= interleavedStudents.size()) break;

                    Student student = interleavedStudents.get(studentIndex);
                    String seatNumber = "R" + row + "C" + col;

                    Seating seating = new Seating();
                    seating.setExam(exam);
                    seating.setStudent(student);
                    seating.setHall(hall);
                    seating.setSeatNumber(seatNumber);

                    newSeating.add(seatingRepository.save(seating));
                    studentIndex++;
                    seatIndex++;
                }
                if (studentIndex >= interleavedStudents.size()) break;
            }
        }

        return newSeating;
    }

    // Interleave students by department to prevent copying
    private List<Student> interleaveByDepartment(List<Student> students) {
        Map<String, List<Student>> deptMap = students.stream()
                .collect(Collectors.groupingBy(Student::getDepartment));

        List<Student> interleaved = new ArrayList<>();
        int maxSize = deptMap.values().stream().mapToInt(List::size).max().orElse(0);

        for (int i = 0; i < maxSize; i++) {
            for (String dept : deptMap.keySet()) {
                List<Student> deptStudents = deptMap.get(dept);
                if (i < deptStudents.size()) {
                    interleaved.add(deptStudents.get(i));
                }
            }
        }

        return interleaved;
    }

    public List<Seating> getSeatingByExam(Integer examId) {
        return seatingRepository.findByExamId(examId);
    }

    public List<Seating> getSeatingByHall(Integer examId, Integer hallId) {
        return seatingRepository.findByExamIdAndHallId(examId, hallId);
    }
}
