import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Signup from "./components/signup_signin/Signup.jsx";
import Login from "./components/signup_signin/Login.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import AuthNavbar from "./components/Navbar/AuthNavbar.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Courses from "./components/courses/Courses.jsx";
import CourseDetail from "./components/courses/CourseDetail.jsx"; // Import the CourseDetail component
import Community from "./components/Community/Community.jsx"; // Import Community component
import Subscribe from "./components/Subscribe/Subscribe.jsx"; // Import Subscribe component
import About from "./components/About/About.jsx"; // Import About component

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? <Navbar /> : <AuthNavbar />}
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} /> {/* Add dynamic route for course details */}
          <Route path="/community" element={<Community />} /> {/* Add Community route */}
          <Route path="/subscribe" element={<Subscribe />} /> {/* Add Subscribe route */}
          <Route path="/about" element={<About />} /> {/* Add About route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

