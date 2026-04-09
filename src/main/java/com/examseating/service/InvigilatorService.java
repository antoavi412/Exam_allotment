package com.examseating.service;

import com.examseating.model.Invigilator;
import com.examseating.repository.InvigilatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InvigilatorService {
    @Autowired
    private InvigilatorRepository invigilatorRepository;

    public Invigilator addInvigilator(Invigilator invigilator) {
        return invigilatorRepository.save(invigilator);
    }

    public List<Invigilator> getAllInvigilators() {
        return invigilatorRepository.findAll();
    }

    public Invigilator getInvigilatorById(Integer id) {
        return invigilatorRepository.findById(id).orElse(null);
    }

    public List<Invigilator> getInvigilatorsByDepartment(String department) {
        return invigilatorRepository.findByDepartment(department);
    }

    public void deleteInvigilator(Integer id) {
        invigilatorRepository.deleteById(id);
    }

    public void updateAssignedCount(Integer id, Integer count) {
        Invigilator invigilator = invigilatorRepository.findById(id).orElse(null);
        if (invigilator != null) {
            invigilator.setAssignedCount(count);
            invigilatorRepository.save(invigilator);
        }
    }
}
