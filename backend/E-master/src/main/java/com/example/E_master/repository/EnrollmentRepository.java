package com.example.E_master.repository;

import com.example.E_master.models.Course;
import com.example.E_master.models.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
    List<Enrollment> findByUserId(Long userId);
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Integer courseId);
    Optional<Enrollment> findByCourseId(Integer courseId);

    List<Course> findEnrolledCoursesByUserId(Long userId);
}