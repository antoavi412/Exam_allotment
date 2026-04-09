package com.examseating.controller;

import com.examseating.model.Seating;
import com.examseating.service.SeatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
@RequestMapping("/api/seating")
public class SeatingController {
    @Autowired
    private SeatingService seatingService;

    @PostMapping("/generate/{examId}")
    public List<Seating> generateSeating(@PathVariable Integer examId, @RequestBody List<Integer> hallIds) {
        return seatingService.generateSeating(examId, hallIds);
    }

    @GetMapping("/{examId}")
    public List<Seating> getSeating(@PathVariable Integer examId) {
        return seatingService.getSeatingByExam(examId);
    }

    @GetMapping("/{examId}/hall/{hallId}")
    public List<Seating> getSeatingByHall(@PathVariable Integer examId, @PathVariable Integer hallId) {
        return seatingService.getSeatingByHall(examId, hallId);
    }
}
