package com.example.E_master.dto;

import com.example.E_master.models.User;
import com.example.E_master.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnrollmentRequest {
    private Long courseId;
    // Getter and setter
    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }


}
