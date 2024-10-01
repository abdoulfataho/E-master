package com.example.E_master.controller;
import com.example.E_master.dto.EnrollmentRequest;
import com.example.E_master.models.Course;
import com.example.E_master.services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/{userId}/courses")
    public ResponseEntity<List<Course>> getEnrolledCourses(@PathVariable Long userId) {
        List<Course> enrolledCourses = enrollmentService.getEnrolledCourses(userId);
        return ResponseEntity.ok(enrolledCourses);
    }



    @PostMapping("/{userId}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable Long userId, @RequestBody EnrollmentRequest request) {
        enrollmentService.enrollUserInCourse(userId, request.getCourseId());
        return ResponseEntity.ok().build();
    }


//    @GetMapping("/{userId}/courses")
//    public ResponseEntity<List<Course>> getEnrolledCourses(@PathVariable Long userId) {
//        List<Course> enrolledCourses = enrollmentService.getEnrolledCourses(userId);
//        return ResponseEntity.ok(enrolledCourses);
}
