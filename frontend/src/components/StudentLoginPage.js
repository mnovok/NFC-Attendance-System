import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentLoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To show error messages
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send a POST request to the login API route
      const response = await axios.post('http://localhost:5000/user/login', { email: studentId, password });

      // If login is successful, store token and navigate
      localStorage.setItem('token', response.data.token); // Store the token in localStorage or sessionStorage
      navigate('/student-dashboard');
    } catch (error) {
      // Handle error (invalid credentials)
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Pogrešan email ili lozinka');
      } else {
        setError('Pogrešan email ili lozinka');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Prijavite se kao student</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lozinka"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error */}
        <button
          className="w-full py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          onClick={handleLogin}
        >
          Prijava
        </button>
      </div>
    </div>
  );
}

export default StudentLoginPage;
