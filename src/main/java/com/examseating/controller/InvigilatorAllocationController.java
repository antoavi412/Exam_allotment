package com.examseating.controller;

import com.examseating.model.InvigilatorAllocation;
import com.examseating.service.InvigilatorAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invigilator")
public class InvigilatorAllocationController {
    @Autowired
    private InvigilatorAllocationService invigilatorAllocationService;

    @PostMapping("/allocate/{examId}")
    public List<InvigilatorAllocation> allocateInvigilators(@PathVariable Integer examId, @RequestBody List<Integer> hallIds) {
        return invigilatorAllocationService.allocateInvigilators(examId, hallIds);
    }

    @GetMapping("/allocation/{examId}")
    public List<InvigilatorAllocation> getAllocationsByExam(@PathVariable Integer examId) {
        return invigilatorAllocationService.getAllocations(examId);
    }
}
