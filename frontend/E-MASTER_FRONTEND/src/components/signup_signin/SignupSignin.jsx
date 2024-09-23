// import React, { useState } from 'react';
// import Login from './Login';
// import Signup from './Signup';

// const SignupSignin = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [message, setMessage] = useState('');

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           {isLogin ? 'Sign In' : 'Create Account'}
//         </h1>
//         {message && (
//           <p className="text-center text-red-500 mb-4">{message}</p>
//         )}
//         {isLogin ? (
//           <Login setMessage={setMessage} />
//         ) : (
//           <Signup setMessage={setMessage} setIsLogin={setIsLogin} />
//         )}
//         <p className="text-center">
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button
//             className="text-red-500 font-semibold"
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setMessage('');
//             }}
//           >
//             {isLogin ? 'Sign Up' : 'Sign In'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupSignin;

