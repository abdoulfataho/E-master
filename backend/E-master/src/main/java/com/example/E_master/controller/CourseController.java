package com.example.E_master.controller;

import com.example.E_master.models.Course;
import com.example.E_master.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestPart("course") Course course, @RequestPart("file") MultipartFile file) throws IOException {
        Course createdCourse = courseService.createCourse(course, file);
        return ResponseEntity.ok(createdCourse);
    }

    @GetMapping("/allCourses")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<?> getCoursePdf(@PathVariable Long id) {
        Optional<Course> course = courseService.findById(id);
        if (course.isPresent()) {
            String pdfPath = course.get().getPdfPath();
            try {
                Path filePath = Paths.get(pdfPath);
                byte[] pdfBytes = Files.readAllBytes(filePath);
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName().toString() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(pdfBytes);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading PDF file");
            }
        } else {
            return ResponseEntity.badRequest().body("Course not found");
        }
    }
}


