package com.example.E_master.services;

import com.example.E_master.models.Enrollment;
import com.example.E_master.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public Enrollment enroll(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }
}
