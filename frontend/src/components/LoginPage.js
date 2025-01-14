import React, { useState } from 'react';

function LoginPage({ match }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log(`Logging in as ${match.params.role}: ${username}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6">Prijavite se kao {match.params.role}</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600"
          >
            Prijava
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
