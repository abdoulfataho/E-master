package com.example.E_master.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
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

    // Add these fields to match the frontend expectations
    private String icon;

    @ElementCollection
    private List<String> learningOutcomes;

    @ElementCollection
    private List<String> content;
}