package com.example.E_master.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String objectives;
    private String instructor;
    private String duration;

    public void setPdfPath(String filePath) {
    }

    public String getPdfPath() {
        return "";
    }


    // Add other fields as needed

    // Getters and setters
}