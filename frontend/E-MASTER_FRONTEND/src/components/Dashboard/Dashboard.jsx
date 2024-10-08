import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    const fetchEnrolledCoursesWithProgress = async () => {
      const userID = localStorage.getItem('userID');

      try {
        console.log('Fetching enrolled courses for user ID:', userID);
        const response = await fetch(`http://localhost:7071/enrollments/${userID}/courses`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const coursesData = await response.json();
          
          // Get progress from local storage
          const coursesWithProgress = coursesData.map(course => {
            const progressKey = `course_progress_${userID}_${course.id}`;
            const progress = localStorage.getItem(progressKey) || '0';
            return { ...course, progress: parseInt(progress, 10) };
          });

          setEnrolledCourses(coursesWithProgress);
        } else {
          console.error('Failed to fetch enrolled courses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCoursesWithProgress();
  }, [token]);

  // Function to update progress
  const updateProgress = (courseId, newProgress) => {
    const userID = localStorage.getItem('userID');
    const progressKey = `course_progress_${userID}_${courseId}`;
    localStorage.setItem(progressKey, newProgress.toString());
    
    setEnrolledCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, progress: newProgress } : course
      )
    );
  };

  if (!isAuthenticated) {
    console.log('Redirecting to login page');
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('Rendering dashboard with', enrolledCourses.length, 'enrolled courses');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      {enrolledCourses.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{course.progress}% Complete</p>
              </div>
              <Link 
                to={`/course/${course.id}/learn`} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => {
                  // Simulate progress update when clicking "Continue Learning"
                  const newProgress = Math.min(course.progress + 10, 100);
                  updateProgress(course.id, newProgress);
                }}
              >
                {course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
