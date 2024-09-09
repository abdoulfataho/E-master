package com.example.E_master.controller;

import com.example.E_master.models.Enrollment;
import com.example.E_master.services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/enroll")
    public Enrollment enroll(@RequestBody Enrollment enrollment) {
        return enrollmentService.enroll(enrollment);
    }
}
