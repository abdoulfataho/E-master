package com.example.E_master.services;

import com.example.E_master.models.Course;
import com.example.E_master.models.User;
import com.example.E_master.repository.CourseRepository;
import com.example.E_master.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
////import org.springframework.security.core.userdetails.UserDetails;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.core.userdetails.UsernameNotFoundException;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) throws Exception {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String loginUser(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            // Generate and return a token (for simplicity, returning a dummy token)
            return "dummy-token";
        } else {
            throw new Exception("Invalid username or password");
        }
    }





    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    private CourseRepository courseRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    public  Optional<User> findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user);
        return userRepository.findByUsername(username);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
public  User CustomUserDetails(String username) {
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    return user;
}
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
}
//    public User registerUser(User user) {
//        user.setPassword(user.getPassword());
//        System.out.println("User registered" + user);
//        return userRepository.save(user);
//    }
//    public User loginUser(String username, String password) throws Exception {
//        User user = userRepository.findByUsername(username);
//        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
//            return user;
//        }
//        return null;
//    }

//    @Autowired
//    private UserRepository userRepo;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    public String loginUser(String username, String password) {
//        Optional<User> user = userRepo.findByUsername(username);
//        if (user != null && passwordEncoder.matches(password, user.get().getPassword())) {
//            return jwtUtil.generateToken(username);
//        }
//        return null;
//    }


//    @Bean
//   public BCryptPasswordEncoder passwordEncoder() {
//      return new BCryptPasswordEncoder();
//  }




//    public String loginUser(String username, String password) throws Exception {
//        // Retrieve user details from repository
//        List<User> users = userRepository.findAll();
//
//        for (User user : users) {
//            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
//                return "true";
//            }
//        }
//
//return "false";
//    }






//
//    @Transactional
//    public void enrollUserInCourse(String username, Long courseId) {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        Course course = courseRepository.findById(Math.toIntExact(courseId))
//                .orElseThrow(() -> new RuntimeException("Course not found"));
//
//        user.getEnrolledCourses().add(course);
//        userRepository.save(user);
//    }

//    public List<Course> getEnrolledCourses(String username) {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        return new ArrayList<>(user.getEnrolledCourses());
//    }

//    public List<Course> getEnrolledCourses(String username) {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        return new ArrayList<>(user.getEnrolledCourses());
//    }
}
