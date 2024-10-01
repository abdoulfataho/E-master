package com.example.E_master.repository;

import com.example.E_master.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c JOIN Enrollment e ON c.id = e.courseId WHERE e.userId = :userId")
    List<Course> findCoursesByUserId(Long userId);
}
