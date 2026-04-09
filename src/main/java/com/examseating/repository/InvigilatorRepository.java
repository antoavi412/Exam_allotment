package com.examseating.repository;

import com.examseating.model.Invigilator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvigilatorRepository extends JpaRepository<Invigilator, Integer> {
    List<Invigilator> findByDepartment(String department);
}
