import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // First, check if the email already exists
      const checkResponse = await fetch('http://localhost:7071/users/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        if (checkData.exists) {
          setMessage('Email already exists. Please use a different email or log in.');
          return;
        }
      } else {
        const errorData = await checkResponse.json();
        throw new Error(`Failed to check email: ${errorData.message || 'Unknown error'}`);
      }

      // If email doesn't exist, proceed with registration
      const registerResponse = await fetch('http://localhost:7071/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, role }),
      });
let data =  await registerResponse.json();
console.log(data)
   
      if (data.userID) {
    
          setMessage('Account created successfully! You are now logged in.');
          localStorage.setItem('userID', data.userID); // Store the token in local storage

          login("token"); // Log the user ins
          navigate('/'); // Redirect to home page
        
        // if (typeof data.token === 'string') {
        //   setMessage('Account created successfully! You are now logged in.');
        //   login(data.token); // Log the user in
        //   navigate('/'); // Redirect to home page
        // } else {
        //   throw new Error('Invalid token received from server');
        // }
      } 

      else {
        // Try to parse the error response as JSON
        let errorData;
        try {
          errorData = await registerResponse.json();
        } catch (jsonError) {
          // If parsing fails, use the response text
          errorData = { message: await registerResponse.text() };
        }
        throw new Error(`Failed to create account: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        {message && <p className="mb-4 text-center text-sm font-medium text-red-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
