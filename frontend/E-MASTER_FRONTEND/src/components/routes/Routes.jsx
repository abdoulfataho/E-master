import React from 'react'
import { Route, Routes as R  } from 'react-router-dom'
import Hero from '../hero/Hero'
import Courses from '../courses/Courses'
import SignupSignin from '../signup_signin/SignupSignin'
import About from '../Banner/About' // Import the About component
import Subscribe from '../Subscribe/Subscribe'
import JoinUs from '../Banner/JoinUs'
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
            
        </R>
    
    </>

  )
}

export default Routes