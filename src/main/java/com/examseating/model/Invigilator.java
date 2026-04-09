package com.examseating.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invigilators")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Invigilator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String invigilatorName;
    private String department;
    private Integer assignedCount = 0;
}
