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
    </Routes>
  );
};

export default AppRoutes;