import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Ensure Tailwind is imported here
import LoginPage from './components/LoginPage'; // LoginPage component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-semibold mb-4">Dobrodošli u Sustav Evidencije Prisutnosti</h1>
                <p className="text-lg mb-6">Odaberite ulogu za prijavu:</p>
                <div className="space-y-4">
                  <button
                    className="w-full py-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600"
                    onClick={() => window.location.href = '/login/student'}
                  >
                    Student
                  </button>
                  <button
                    className="w-full py-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600"
                    onClick={() => window.location.href = '/login/professor'}
                  >
                    Profesor
                  </button>
                </div>
              </div>
            </div>
          }
        />
        {/* Login Page */}
        <Route path="/login/:role" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
