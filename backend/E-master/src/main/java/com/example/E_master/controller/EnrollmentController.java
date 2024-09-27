package com.example.E_master.controller;

import com.example.E_master.models.Course;
import com.example.E_master.services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*") // Adjust this to match your frontend URL
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/{userId}/enrolled-courses")
    public ResponseEntity<List<Course>> getEnrolledCourses(@PathVariable Long userId) {
        List<Course> enrolledCourses = enrollmentService.getEnrolledCourses(userId);
        return ResponseEntity.ok(enrolledCourses);
    }

    @PostMapping("/{userId}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long userId, @RequestBody Map<String, Long> payload) {
        Long courseId = payload.get("courseId");
        enrollmentService.enrollUserInCourse(userId, courseId);
        return ResponseEntity.ok().build();
    }
}
