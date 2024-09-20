import React, { useState } from 'react';

const SignupSignin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isLogin) {
      // Login logic
      try {
        const response = await fetch('http://localhost:7071/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          mode: 'cors',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setMessage('Login successful!');
          // Handle successful login (e.g., store token, redirect)
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || 'User doesn\'t exist. Please create an account.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
        console.error('Fetch error:', error);
      }
    } else {
      // Signup logic
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
          throw new Error('Failed to check email');
        }

        // If email doesn't exist, proceed with registration
        const registerResponse = await fetch('http://localhost:7071/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, password, role }),
        });

        if (registerResponse.ok) {
          setMessage('Account created successfully! Please log in.');
          setIsLogin(true);
        } else {
          const errorData = await registerResponse.json();
          setMessage(errorData.message || 'Failed to create account. Please try again.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>
        {message && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 mb-4 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {!isLogin && (
            <select
              className="border border-gray-300 p-2 mb-4 w-full rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          )}
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded w-full mb-4">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            className="text-red-500 font-semibold"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupSignin;

