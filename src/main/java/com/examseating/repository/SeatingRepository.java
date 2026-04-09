package com.examseating.repository;

import com.examseating.model.Seating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SeatingRepository extends JpaRepository<Seating, Integer> {
    List<Seating> findByExamId(Integer examId);
    List<Seating> findByExamIdAndHallId(Integer examId, Integer hallId);
}
