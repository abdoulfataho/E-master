package com.example.E_master;

import com.example.E_master.models.User;
import com.example.E_master.models.Course;
import com.example.E_master.services.UserService;
import com.example.E_master.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create Users
        User student1 = new User();
        student1.setUsername("student1");
        student1.setPassword("password1");
        student1.setRole("STUDENT");

        User student2 = new User();
        student2.setUsername("student2");
        student2.setPassword("password2");
        student2.setRole("STUDENT");

        User instructor1 = new User();
        instructor1.setUsername("instructor1");
        instructor1.setPassword("password3");
        instructor1.setRole("INSTRUCTOR");

        User instructor2 = new User();
        instructor2.setUsername("instructor2");
        instructor2.setPassword("password4");
        instructor2.setRole("INSTRUCTOR");

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword("adminpassword");
        admin.setRole("ADMIN");

        userService.createUser(student1);
        userService.createUser(student2);
        userService.createUser(instructor1);
        userService.createUser(instructor2);
        userService.createUser(admin);

        // Create Courses
        Course course1 = new Course();
        course1.setTitle("Course 1");
        course1.setDescription("Description for Course 1");
        course1.setInstructor(instructor1);

        Course course2 = new Course();
        course2.setTitle("Course 2");
        course2.setDescription("Description for Course 2");
        course2.setInstructor(instructor2);

        courseRepository.save(course1);
        courseRepository.save(course2);
    }
}
