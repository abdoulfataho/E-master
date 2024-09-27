import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const CourseDetail = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  // Assuming you have a function to fetch course details by ID
  const course = getCourseById(id);

  useEffect(() => {
    setIsVisible(true);
    checkEnrollmentStatus();
  }, []);

  const checkEnrollmentStatus = async () => {
    try {
      const response = await fetch(`http://localhost:7071/enrollements/${user.id}/enrolled-courses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const enrolledCourses = await response.json();
        setIsEnrolled(enrolledCourses.some(c => c.id === parseInt(id)));
      }
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    }
  };

  const handleEnroll = async () => {
    try {
      console.log('Enrolling user:', user.id, 'in course:', id);
      const response = await fetch(`http://localhost:7071/enrollements/${user.id}/enroll`, {
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
        alert("You have successfully enrolled in the course!");
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
    </div>
  );
};

// Mock function to get course details by ID
const getCourseById = (id) => {
  const courses = [
    {
      id: 1,
      title: "WEB DEVELOPMENT",
      description: "Learn to build modern, responsive websites using HTML, CSS, and JavaScript.",
      objectives: "This course aims to provide a comprehensive understanding of web development technologies and practices, enabling students to create dynamic and responsive websites.",
      learningOutcomes: [
        "Understand the structure and styling of web pages using HTML and CSS",
        "Implement interactive features with JavaScript",
        "Create responsive designs for various screen sizes",
        "Apply best practices in web development"
      ],
      content: ["HTML Basics", "CSS Fundamentals", "JavaScript Essentials", "Responsive Design"],
      instructor: "John Doe",
      duration: "10 weeks"
    },
    {
      id: 2,
      title: "CYBER SECURITY",
      description: "Explore the world of cybersecurity and learn to protect digital assets from threats.",
      objectives: "This course aims to equip students with the knowledge and skills necessary to identify, analyze, and mitigate security risks in digital environments.",
      learningOutcomes: [
        "Understand fundamental concepts of cybersecurity",
        "Implement network security measures",
        "Apply cryptographic techniques for data protection",
        "Conduct ethical hacking and penetration testing"
      ],
      content: ["Introduction to Cyber Security", "Network Security", "Cryptography", "Ethical Hacking"],
      instructor: "Jane Smith",
      duration: "12 weeks"
    },
    {
      id: 3,
      title: "SOFTWARE ENGINEERING",
      description: "Master the principles of software design, development, and maintenance.",
      objectives: "This course aims to provide a comprehensive understanding of software engineering principles and practices, enabling students to design, develop, and maintain high-quality software systems.",
      learningOutcomes: [
        "Understand the software development life cycle",
        "Apply object-oriented programming concepts",
        "Implement design patterns in software development",
        "Practice Agile methodologies in project management"
      ],
      content: ["Software Development Life Cycle", "Object-Oriented Programming", "Design Patterns", "Agile Methodologies"],
      instructor: "Alice Johnson",
      duration: "14 weeks"
    },
    {
      id: 4,
      title: "FULL STACK JAVA DEVELOPMENT",
      description: "Become proficient in both front-end and back-end development using Java technologies.",
      objectives: "This course aims to develop full-stack development skills using Java technologies, enabling students to build complete web applications from front to back end.",
      learningOutcomes: [
        "Master Java programming fundamentals",
        "Develop back-end applications using Spring Framework",
        "Implement data persistence with Hibernate",
        "Create dynamic front-end interfaces with React"
      ],
      content: ["Java Basics", "Spring Framework", "Hibernate", "Front-end with React"],
      instructor: "Bob Brown",
      duration: "16 weeks"
    },
    {
      id: 5,
      title: "AMAZON WEB SERVICES",
      description: "Learn to leverage AWS cloud services for scalable and efficient applications.",
      objectives: "This course aims to provide a comprehensive understanding of AWS cloud services and best practices for building scalable, efficient, and secure cloud applications.",
      learningOutcomes: [
        "Understand core AWS services and their use cases",
        "Deploy and manage applications on EC2 and S3",
        "Develop serverless applications using AWS Lambda",
        "Implement DevOps practices on AWS"
      ],
      content: ["AWS Fundamentals", "EC2 and S3", "Lambda and Serverless", "DevOps on AWS"],
      instructor: "Charlie Davis",
      duration: "8 weeks"
    },
    {
      id: 6,
      title: "DESKTOP SUPPORT",
      description: "Gain skills to provide excellent technical support for desktop systems and software.",
      objectives: "This course aims to equip students with the technical knowledge and customer service skills necessary to provide effective desktop support in various IT environments.",
      learningOutcomes: [
        "Troubleshoot common hardware and software issues",
        "Perform software installation and configuration",
        "Configure and maintain network connections",
        "Develop effective customer communication skills"
      ],
      content: ["Hardware Troubleshooting", "Software Installation", "Network Configuration", "Customer Support"],
      instructor: "Diana Evans",
      duration: "6 weeks"
    },
  ];

  return courses.find(course => course.id === parseInt(id));
};

export default CourseDetail;
