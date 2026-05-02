package com.examseating.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "halls")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String hallName;
    private Integer capacity;

    @Column(name = "row_count")
    private Integer rows;

    @Column(name = "col_count")
    private Integer columns;
}
