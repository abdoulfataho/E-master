package com.example.E_master.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String role; // "STUDENT" or "INSTRUCTOR"

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> sessionIds;
}