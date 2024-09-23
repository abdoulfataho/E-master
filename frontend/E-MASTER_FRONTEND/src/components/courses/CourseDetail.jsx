import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const CourseDetail = () => {
  const { id } = useParams();
  const { user, token } = useAuth();

  // Assuming you have a function to fetch course details by ID
  const course = getCourseById(id);

  const handleEnroll = async () => {
    try {
      const response = await fetch(`http://localhost:7071/users/${user.id}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId: course.id })
      });

      if (response.ok) {
        alert("You have successfully enrolled in the course!");
      } else {
        const errorData = await response.json();
        alert(`Failed to enroll: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('An error occurred while enrolling in the course.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">{course.title}</h1>
        <p className="text-lg mb-4 text-gray-700">{course.description}</p>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-500">Course Content</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            {course.content.map((item, index) => (
              <li key={index} className="text-lg">{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-500">Instructor</h2>
          <p className="text-lg text-gray-700">{course.instructor}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-500">Duration</h2>
          <p className="text-lg text-gray-700">{course.duration}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-500">Price</h2>
          <p className="text-lg text-gray-700">{course.price}</p>
        </div>
        <div className="text-center">
          <button 
            onClick={handleEnroll} 
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Enroll Now
          </button>
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
      content: ["HTML Basics", "CSS Fundamentals", "JavaScript Essentials", "Responsive Design"],
      instructor: "John Doe",
      duration: "10 weeks",
      price: "$499"
    },
    {
      id: 2,
      title: "CYBER SECURITY",
      description: "Explore the world of cybersecurity and learn to protect digital assets from threats.",
      content: ["Introduction to Cyber Security", "Network Security", "Cryptography", "Ethical Hacking"],
      instructor: "Jane Smith",
      duration: "12 weeks",
      price: "$599"
    },
    {
      id: 3,
      title: "SOFTWARE ENGINEERING",
      description: "Master the principles of software design, development, and maintenance.",
      content: ["Software Development Life Cycle", "Object-Oriented Programming", "Design Patterns", "Agile Methodologies"],
      instructor: "Alice Johnson",
      duration: "14 weeks",
      price: "$699"
    },
    {
      id: 4,
      title: "FULL STACK JAVA DEVELOPMENT",
      description: "Become proficient in both front-end and back-end development using Java technologies.",
      content: ["Java Basics", "Spring Framework", "Hibernate", "Front-end with React"],
      instructor: "Bob Brown",
      duration: "16 weeks",
      price: "$799"
    },
    {
      id: 5,
      title: "AMAZON WEB SERVICES",
      description: "Learn to leverage AWS cloud services for scalable and efficient applications.",
      content: ["AWS Fundamentals", "EC2 and S3", "Lambda and Serverless", "DevOps on AWS"],
      instructor: "Charlie Davis",
      duration: "8 weeks",
      price: "$399"
    },
    {
      id: 6,
      title: "DESKTOP SUPPORT",
      description: "Gain skills to provide excellent technical support for desktop systems and software.",
      content: ["Hardware Troubleshooting", "Software Installation", "Network Configuration", "Customer Support"],
      instructor: "Diana Evans",
      duration: "6 weeks",
      price: "$299"
    },
  ];

  return courses.find(course => course.id === parseInt(id));
};

export default CourseDetail;