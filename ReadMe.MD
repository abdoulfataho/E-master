# E-master

## Overview

E-master is a comprehensive e-learning platform designed to provide a seamless educational experience for students and instructors. Our platform offers a wide range of courses, interactive learning materials, and tools to facilitate effective online education.

### Built With
| Technology | Description |
|------------|-------------|
| Spring Boot | Backend development with REST APIs |
| Spring Security | Authentication and authorization |
| React.js | Frontend development |
| MySQL | Database management |
| Tailwind CSS | Styling |
| Maven | Project management |

## Features

### For Students
- Access to a wide variety of courses
- Interactive learning materials (videos, quizzes, assignments)
- Progress tracking
- Discussion forums for each course
- Personal dashboard to manage enrolled courses

### For Instructors
- Course creation and management tools
- Student progress monitoring
- Assignment and quiz creation
- Live session scheduling

### For Administrators
- User management (students, instructors, admins)
- Course approval and moderation
- Platform analytics and reporting

## Project Structure

### Backend

1. **Controllers**: Handle HTTP requests and responses
   - `UserController.java`
   - `CourseController.java`
   - `EnrollmentController.java`

2. **Services**: Contain business logic
   - `UserService.java`
   - `CourseService.java`
   - `EnrollmentService.java`

3. **Repositories**: Interact with the database
   - `UserRepository.java`
   - `CourseRepository.java`
   - `EnrollmentRepository.java`

4. **Models**: Define the data structure
   - `User.java`
   - `Course.java`
   - `Enrollment.java`

5. **Configuration**: Setup security and database configurations
   - `SecurityConfig.java`
   - `CorsConfig.java`

### Frontend

1. **Components**:
   - `LoginForm.jsx`: User authentication
   - `CourseList.jsx`: Display available courses
   - `CourseDashboard.jsx`: Individual course view
   - `UserProfile.jsx`: User profile management

2. **Routing**: 
   - `App.js`: Main application router

## Getting Started

1. Clone the repository
2. Set up the backend:
   - Configure MySQL database
   - Run `mvn install` to install dependencies
   - Start the Spring Boot application
3. Set up the frontend:
   - Navigate to the frontend directory
   - Run `npm install` to install dependencies
   - Start the React application with `npm start`

## Future Improvements

1. Implement real-time video conferencing for live classes
2. Develop a mobile application for on-the-go learning
3. Integrate an AI-powered recommendation system for personalized course suggestions
4. Implement gamification elements to increase user engagement

## Contributing

We welcome contributions to E-master! Please read our contributing guidelines before submitting pull requests.


## database schema
![alt text](<Screenshot 2024-10-09 115556.png>)