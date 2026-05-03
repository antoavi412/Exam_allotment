package com.examseating.controller;

import com.examseating.model.Hall;
import com.examseating.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {org.springframework.web.bind.annotation.RequestMethod.GET, org.springframework.web.bind.annotation.RequestMethod.POST, org.springframework.web.bind.annotation.RequestMethod.PUT, org.springframework.web.bind.annotation.RequestMethod.DELETE, org.springframework.web.bind.annotation.RequestMethod.OPTIONS})
@RequestMapping("/api/halls")
public class HallController {
    @Autowired
    private HallService hallService;

    @PostMapping
    public Hall addHall(@RequestBody Hall hall) {
        return hallService.addHall(hall);
    }

    @GetMapping
    public List<Hall> getAllHalls() {
        return hallService.getAllHalls();
    }

    @GetMapping("/{id}")
    public Hall getHall(@PathVariable Integer id) {
        return hallService.getHallById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteHall(@PathVariable Integer id) {
        hallService.deleteHall(id);
    }
}
