import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const CourseDetail = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    if (user && user.id) {
      checkEnrollmentStatus();
    }
    fetchCourseDetails();
  }, [id, user]);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:7071/api/courses/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        console.error('Failed to fetch course details');
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleEnroll = async () => {
 
    try {
      console.log('Enrolling user:', user.id, 'in course:', id);
      console.log('user:', user);
      let userID = localStorage.getItem('userID');
      console.log(userID);
      const response = await fetch(`http://localhost:7071/enrollments/${userID}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId: parseInt(id) })
       
      });

      console.log('Response status:', response.status);
      const responseData = await response.text();
      console.log('Response data:', responseData);

      if (response.ok) {
        setIsEnrolled(true);
        alert("Congratulations! You have successfully enrolled in this Course!");
        navigate('/dashboard', { state: { refreshEnrollments: true } });
      } else {
        const errorMessage = responseData ? JSON.parse(responseData).message : 'Unknown error occurred';
        alert(`Failed to enroll: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert(`An error occurred while enrolling in the course: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {course && (
        <div className={`bg-gray-800 shadow-lg rounded-lg p-6 text-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold mb-4 text-center text-blue-400">{course.title}</h1>
          <p className="text-lg mb-4 text-gray-300">{course.description}</p>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-blue-400">Course Objectives</h2>
            <p className="text-lg text-gray-300">{course.objectives}</p>
          </div>
        
           <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-blue-400">What You Will Learn</h2>
            <ul className="list-disc list-inside mb-4 text-gray-300">
              {course.learningOutcomes.map((item, index) => (
                <li key={index} className="text-lg transition-transform duration-300 hover:translate-x-2">{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-blue-400">Course Content</h2>
            <ul className="list-disc list-inside mb-4 text-gray-300">
              {course.content.map((item, index) => (
                <li key={index} className="text-lg transition-transform duration-300 hover:translate-x-2">{item}</li>
              ))}
            </ul>
          </div> 
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-blue-400">Instructor</h2>
            <p className="text-lg text-gray-300">{course.instructor}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-blue-400">Duration</h2>
            <p className="text-lg text-gray-300">{course.duration}</p>
          </div>
          <div className="text-center">
            {isEnrolled ? (
              <p className="text-green-400 font-bold">You are enrolled in this course</p>
            ) : (
              <button 
                onClick={handleEnroll} 
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;