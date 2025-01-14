import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfessorLoginPage() {
  const [professorId, setProfessorId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, let's log the credentials to the console (you would replace this with an API call)
    console.log('Professor ID:', professorId, 'Password:', password);

    // Navigate to the professor dashboard or main page after successful login
    navigate('/professor-dashboard'); // Adjust this based on your app's flow
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Prijavite se kao profesor</h1>
        <input
          type="text"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={professorId}
          onChange={(e) => setProfessorId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Lozinka"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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