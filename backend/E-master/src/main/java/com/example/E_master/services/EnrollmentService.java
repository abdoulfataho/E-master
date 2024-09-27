package com.example.E_master.services;

import com.example.E_master.models.Course;
import com.example.E_master.models.User;
import com.example.E_master.repository.UserRepository;
import com.example.E_master.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getEnrolledCourses(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getEnrolledCourses();
    }

    public void enrollUserInCourse(Long userId, Long courseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!user.getEnrolledCourses().contains(course)) {
            user.getEnrolledCourses().add(course);
            userRepository.save(user);
        }
    }
}

