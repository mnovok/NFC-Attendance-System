import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/userService';

function ProfessorLoginPage() {
  const [professorEmail, setProfessorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(professorEmail, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({ _id: response._id ,name: response.name, surname: response.surname }));
      navigate('/professor-dashboard');
      console.log('Login response:', response);
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Invalid email or password');
      } else {
        setError('Invalid email or password');
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
    <div className="flex items-center justify-center min-h-screen bg-blue-100"
    style={{
      backgroundImage: 'url("https://egradnja.hr/sites/default/files/2024/06/17/branka%20juras%20fesb8.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      }}>
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full relative z-10">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Prijavite se kao professor</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={professorEmail}
          onChange={(e) => setProfessorEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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

export default ProfessorLoginPage;