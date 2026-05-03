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

    public String getName() {
        return invigilatorName;
    }

    public void setName(String name) {
        this.invigilatorName = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getAssignedCount() {
        return assignedCount != null ? assignedCount : 0;
    }

    public void setAssignedCount(Integer count) {
        this.assignedCount = count;
    }
}
