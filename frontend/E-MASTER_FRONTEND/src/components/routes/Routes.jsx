import React from 'react'
import { Route, Routes as R  } from 'react-router-dom'
import Hero from '../Hero/Hero'
import Courses from '../courses/Courses'
import SignupSignin from '../signup_signin/SignupSignin'
import About from '../Banner/About' // Import the About component
import Subscribe from '../Subscribe/Subscribe'
import JoinUs from '../Banner/JoinUs'
import Dashboard from '../courses/Dashboard'
import Register from '../register/Register'
function Routes() {
  return (
    <>
        <R>
            <Route path="/Home" element={<Hero/>}  />
            <Route path="/courses" element={<Courses/>}  />
            <Route path="/signin" element={<SignupSignin/>}  />
            <Route path="/About" element={<About/>}  /> // Add the About component to the Route
            <Route path="/Subscribe" element={<Subscribe/>}  />
            <Route path="/JoinUs" element={<JoinUs/>}  />
            <Route path="/dashboard" element={<Dashboard/>}  />
            <Route path="/register" element={<Register/>}  />
        </R>
    
    </>

  )
}

export default Routes