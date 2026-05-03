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

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public Integer getColumns() {
        return columns;
    }

    public void setColumns(Integer columns) {
        this.columns = columns;
    }
}
