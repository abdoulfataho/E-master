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


  if (!course) {
    console.log("Course not found");
    return <div>Course not found</div>;
  }

  return (
    <div>
    <embed
      src={course.courseUrl}
      width="100%"
      height="600px"
      type="application/pdf"
    />
  </div>
  );
};

export default CourseContent;