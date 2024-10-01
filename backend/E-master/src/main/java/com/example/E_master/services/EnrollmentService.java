package com.example.E_master.services;

import com.example.E_master.models.Course;
import com.example.E_master.models.Enrollment;
import com.example.E_master.repository.CourseRepository;
import com.example.E_master.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;


    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getEnrolledCourses(Long userId) {
        return courseRepository.findCoursesByUserId(userId);
    }

    public void enrollUserInCourse(Long userId, Long courseId) {
        Enrollment enrollment = new Enrollment();
        enrollment.setUserId(userId);
        enrollment.setCourseId(courseId);
        enrollmentRepository.save(enrollment);
    }}
