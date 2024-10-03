import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Courses from '../courses/Courses'
import CourseDetail from '../courses/CourseDetail'
import Login from '../signup_signin/Login'
import Signup from '../signup_signin/Signup'
import Subscribe from '../Subscribe/Subscribe'
import Home from '../Home/Home'
import About from '../Banner/About'
import JoinUs from '../Banner/JoinUs'
import Dashboard from '../Dashboard/Dashboard'
import CourseContent from '../courses/CourseContent'
import ContactUs from '../contact/ContactUs'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/community" element={<JoinUs />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:courseId/learn" element={<CourseContent />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
};

export default AppRoutes;