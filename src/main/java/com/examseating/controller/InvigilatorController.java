package com.examseating.controller;

import com.examseating.model.Invigilator;
import com.examseating.service.InvigilatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {org.springframework.web.bind.annotation.RequestMethod.GET, org.springframework.web.bind.annotation.RequestMethod.POST, org.springframework.web.bind.annotation.RequestMethod.PUT, org.springframework.web.bind.annotation.RequestMethod.DELETE, org.springframework.web.bind.annotation.RequestMethod.OPTIONS})
@RequestMapping("/api/invigilators")
public class InvigilatorController {
    @Autowired
    private InvigilatorService invigilatorService;

    @PostMapping
    public Invigilator addInvigilator(@RequestBody Invigilator invigilator) {
        return invigilatorService.addInvigilator(invigilator);
    }

    @GetMapping
    public List<Invigilator> getAllInvigilators() {
        return invigilatorService.getAllInvigilators();
    }

    @GetMapping("/{id}")
    public Invigilator getInvigilator(@PathVariable Integer id) {
        return invigilatorService.getInvigilatorById(id);
    }

    @GetMapping("/department/{dept}")
    public List<Invigilator> getByDepartment(@PathVariable String dept) {
        return invigilatorService.getInvigilatorsByDepartment(dept);
    }

    @DeleteMapping("/{id}")
    public void deleteInvigilator(@PathVariable Integer id) {
        invigilatorService.deleteInvigilator(id);
    }
}
