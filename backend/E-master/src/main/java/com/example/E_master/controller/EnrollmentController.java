package com.example.E_master.controller;

import com.example.E_master.dto.EnrollmentRequest;
import com.example.E_master.models.Course;
import com.example.E_master.models.Enrollment;
import com.example.E_master.services.EnrollmentService;
//import org.apache.catalina.User;
import com.example.E_master.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

//    @PostMapping("/enroll")
//    public ResponseEntity<?> enrollInCourse(@RequestBody EnrollmentRequest request,
//                                            @AuthenticationPrincipal UserDetails userDetails) {
//        User user = ((User) userDetails).getUser();
//        Enrollment enrollment = enrollmentService.enrollUserInCourse(Long.valueOf(user.getId()), request.getCourseId());
//        return ResponseEntity.ok(enrollment);
//    }

    @GetMapping("/users/{id}/enrolled-courses")
    public ResponseEntity<List<Course>> getEnrolledCourses(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.getEnrolledCourses(id));
    }
}
