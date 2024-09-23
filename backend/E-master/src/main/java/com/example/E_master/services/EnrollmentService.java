package com.example.E_master.services;

import com.example.E_master.models.Course;
import com.example.E_master.models.Enrollment;
import com.example.E_master.models.User;
import com.example.E_master.repository.CourseRepository;
import com.example.E_master.repository.EnrollmentRepository;
import com.example.E_master.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    public Enrollment enrollUserInCourse(Long userId, Integer courseId) {
        User user = userRepository.findById(Math.toIntExact(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.findByUserIdAndCourseId(userId, courseId).isPresent()) {
            throw new RuntimeException("User already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        return enrollmentRepository.save(enrollment);
    }

    public List<Course> getEnrolledCourses(Long userId) {
        return enrollmentRepository.findByUserId(userId).stream()
                .map(Enrollment::getCourse)
                .collect(Collectors.toList());
    }
}
