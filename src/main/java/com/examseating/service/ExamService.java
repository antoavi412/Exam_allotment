package com.examseating.service;

import com.examseating.model.Exam;
import com.examseating.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExamService {
    @Autowired
    private ExamRepository examRepository;

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Integer id) {
        return examRepository.findById(id).orElse(null);
    }

    public void deleteExam(Integer id) {
        examRepository.deleteById(id);
    }
}
