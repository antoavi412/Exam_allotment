package com.examseating.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Integer id;
    private String studentName;
    private String rollNumber;
    private String department;
    private Integer semester;
}
