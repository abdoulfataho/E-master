package com.example.E_master.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.E_master.models.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

}
