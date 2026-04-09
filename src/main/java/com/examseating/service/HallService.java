package com.examseating.service;

import com.examseating.model.Hall;
import com.examseating.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HallService {
    @Autowired
    private HallRepository hallRepository;

    public Hall addHall(Hall hall) {
        return hallRepository.save(hall);
    }

    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }

    public Hall getHallById(Integer id) {
        return hallRepository.findById(id).orElse(null);
    }

    public void deleteHall(Integer id) {
        hallRepository.deleteById(id);
    }
}
