import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/userService';

function StudentLoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const response = await loginUser(studentId, password );
      localStorage.setItem('token', response.token); 
      localStorage.setItem('user', JSON.stringify({ uid: response.uid, name: response.name, surname: response.surname }));
      navigate('/student-dashboard');
      console.log('Login response:', response); 
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Pogrešan email ili lozinka');
      } else {
        setError('Pogrešan email ili lozinka');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin(); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Prijavite se kao student</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          placeholder="Lozinka"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
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
