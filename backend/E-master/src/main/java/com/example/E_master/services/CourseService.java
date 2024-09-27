package com.example.E_master.services;

import com.example.E_master.models.Course;
import com.example.E_master.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

//    public Course createCourse(Course course, MultipartFile file) throws IOException {
//        String filePath = "path/to/upload/directory/" + file.getOriginalFilename();
//        file.transferTo(new File(filePath));
//        course.setPdfPath(filePath);
//        return courseRepository.save(course);
//    }
   public Course createCourse(Course course, MultipartFile file) throws IOException {
        String filePath = "path/to/upload/directory/" + file.getOriginalFilename();
        file.transferTo(new File(filePath));
        course.setPdfPath(filePath);
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }
}
