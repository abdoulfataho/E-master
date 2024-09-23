package com.example.E_master.controller;

import com.example.E_master.models.Course;
import com.example.E_master.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestParam("course") Course course, @RequestParam("file") MultipartFile file) {
        try {
            Course createdCourse = courseService.createCourse(course, file);
            return ResponseEntity.ok(createdCourse);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to upload file: " + e.getMessage());
        }
    }

    @GetMapping("/allCourses")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<?> getCoursePdf(@PathVariable Integer id) {
        Optional<Course> course = courseService.findById(id);
        if (course.isPresent()) {
            String pdfPath = course.get().getPdfPath();
            // Implement logic to return the PDF file
            return ResponseEntity.ok().body("PDF file path: " + pdfPath);
        } else {
            return ResponseEntity.badRequest().body("Course not found");
        }
    }
}


