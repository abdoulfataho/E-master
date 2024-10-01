package com.example.E_master.controller;

import com.example.E_master.models.User;
import com.example.E_master.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        boolean exists = userService.emailExists(email);
        return ResponseEntity.ok().body(Map.of("exists", exists));
    }
@GetMapping("user_Id")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = userService.findById(userId);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            Map<String, Object> response = new HashMap<>();
            User registeredUser = userService.registerUser(user);
            response.put("token", "tokenGranted");
            response.put("userID", registeredUser.getId());
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.ok().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        try {
            String token = userService.loginUser(username, password);
            User findUser = userService.findByUsername(username).get();
            if (token != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("username", username);
                response.put("message", "User logged in successfully");
                response.put("userID", findUser.getId());
                return ResponseEntity.ok().body(response);

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login");
        }
    }
}