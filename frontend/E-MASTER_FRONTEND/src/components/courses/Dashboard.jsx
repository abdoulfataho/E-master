import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    const fetchEnrolledCourses = async () => {
        try {
            const response = await axios.get('http://localhost:7071/users/enrolled-courses', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEnrolledCourses(response.data);
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
        }
    };

    const openCourse = (courseId) => {
        // Navigate to the course content page
        // This is a placeholder - you'll need to implement the course content page
        console.log(`Opening course with ID: ${courseId}`);
    };

    return (
        <div className="dashboard-container">
            <h2>My Enrolled Courses</h2>
            {enrolledCourses.map(course => (
                <div key={course.id} className="enrolled-course-card">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button onClick={() => openCourse(course.id)}>Open Course</button>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;