
package com.example.E_master.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/users/register", "/users/login","users/check-email","/courses/create","/courses/allCourses","/enrollments/{userId}/enroll","/enrollments/{userId}/","/api/courses/create","/api/courses/allCourses","/api/courses/{id}","/api/courses","/users/user_Id").permitAll()
                        .requestMatchers("enrollments/{userId}/enroll","enrollments/{userId}/enrolled-courses","/api/courses/create","/api/courses/allCourses","/api/courses/{id}","/api/courses","/enrollments/{userId}/courses").permitAll()
                        .requestMatchers("/enrollments/{userId}/courses").permitAll()
                        .anyRequest().permitAll()
                );
        return http.build();
    }
}


