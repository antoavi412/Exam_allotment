package com.examseating.service;

import com.examseating.model.*;
import com.examseating.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InvigilatorAllocationService {
    @Autowired
    private InvigilatorAllocationRepository allocationRepository;
    @Autowired
    private InvigilatorRepository invigilatorRepository;
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private HallRepository hallRepository;

    public List<InvigilatorAllocation> allocateInvigilators(Integer examId, List<Integer> hallIds) {
        Exam exam = examRepository.findById(examId).orElse(null);
        if (exam == null) return new ArrayList<>();

        // Delete existing allocations for this exam
        List<InvigilatorAllocation> existingAllocations = allocationRepository.findByExamId(examId);
        allocationRepository.deleteAll(existingAllocations);

        // Get all invigilators
        List<Invigilator> allInvigilators = invigilatorRepository.findAll();

        // Sort by assigned_count (lowest first - load balanced)
        allInvigilators.sort(Comparator.comparingInt(Invigilator::getAssignedCount));

        // Prefer invigilators from DIFFERENT departments
        List<Invigilator> preferred = allInvigilators.stream()
                .filter(i -> !i.getDepartment().equals(exam.getDepartment()))
                .collect(Collectors.toList());

        // If no preferred, use all
        List<Invigilator> available = !preferred.isEmpty() ? preferred : allInvigilators;

        List<InvigilatorAllocation> newAllocations = new ArrayList<>();
        int invigilatorIndex = 0;

        // Round-robin assignment to halls
        for (Integer hallId : hallIds) {
            Hall hall = hallRepository.findById(hallId).orElse(null);
            if (hall == null) continue;

            if (available.isEmpty()) break;

            Invigilator inv = available.get(invigilatorIndex % available.size());

            InvigilatorAllocation allocation = new InvigilatorAllocation();
            allocation.setExam(exam);
            allocation.setHall(hall);
            allocation.setInvigilator(inv);

            newAllocations.add(allocationRepository.save(allocation));

            // Update invigilator's assigned count
            inv.setAssignedCount(inv.getAssignedCount() + 1);
            invigilatorRepository.save(inv);

            invigilatorIndex++;
        }

        return newAllocations;
    }

    public List<InvigilatorAllocation> getAllocations(Integer examId) {
        return allocationRepository.findByExamId(examId);
    }
}
