import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


// Simulated course data with slides


const CourseContent = () => {
  let {courseId} = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:7071/api/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
          console.log('Course data:', data);
        } else {
          console.error('Failed to fetch course details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);


  console.log("Course:", course);
  console.log("Is loading:", isLoading);

  // if (!isAuthenticated) {
  //   console.log("Not authenticated, redirecting to login");
  //   return <Navigate to="/login" />;
  // }

  // if (isLoading) {
  //   console.log("Still loading");
  //   return <div>Loading...</div>;
  // }

  if (!course) {
    console.log("Course not found");
    return <div>Course not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
    </div>
  );
};

export default CourseContent;