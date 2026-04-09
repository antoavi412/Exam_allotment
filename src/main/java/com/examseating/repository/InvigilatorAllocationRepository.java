package com.examseating.repository;

import com.examseating.model.InvigilatorAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvigilatorAllocationRepository extends JpaRepository<InvigilatorAllocation, Integer> {
    List<InvigilatorAllocation> findByExamId(Integer examId);
}
