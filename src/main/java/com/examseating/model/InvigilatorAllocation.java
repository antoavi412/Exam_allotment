package com.examseating.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invigilator_allocation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvigilatorAllocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "hall_id", nullable = false)
    private Hall hall;

    @ManyToOne
    @JoinColumn(name = "invigilator_id", nullable = false)
    private Invigilator invigilator;
}
