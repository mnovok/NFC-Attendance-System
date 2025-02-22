import React, { useState, useEffect } from 'react';
import { getClasses } from '../service/classesService';
import NavBar from './NavBar';

function ProfessorDashboard() {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const professorId = user._id;

  useEffect(() => {
    const fetchClassesData = async () => {
      console.log('Stored User:', storedUser); 
      console.log(professorId);
      if (!professorId) {
        setError('Profesor ID nije dostupan.');
        setLoading(false);
        return;
      }

      try {
        const response = await getClasses(professorId);
        setClassesData(response);
      } catch (err) {
        console.error('Error fetching classes data:', err);
        setError('Došlo je do pogreške prilikom učitavanja podataka.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassesData();
  }, [professorId]);

  const getCardColor = (type) => {
    switch (type) {
      case 'predavanje':
        return 'bg-blue-500';
      case 'lab':
        return 'bg-red-500';
      case 'auditorne':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getRandomAttendance = () => {
    return Math.floor(Math.random() * 81); 
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-blue-200 p-8">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-semibold mb-6 text-blue-900 tracking-wide">
            Nastava profesora {user ? `${user.name} ${user.surname}` : 'profesora'}
          </h1>

          {loading ? (
            <p className="text-gray-500">Učitavanje podataka o nastavi...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : classesData.length > 0 ? (
            classesData.map((classData, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-700 mb-4 tracking-wider">
                  {formatDate(classData.date)}
                </h2>
                <div
                  className={`mb-6 p-5 rounded-lg shadow-lg ${getCardColor(classData.type)} transition-all`}
                >
                  <h3 className="text-xl font-semibold text-white mb-2 tracking-wider font-bold">
                    {classData.name}
                  </h3>
                  <p className="text-lg text-gray-100 mt-2 tracking-widest">
                    {classData.roomNumber}
                  </p>
                  <p className="text-lg text-gray-100 mt-2 tracking-widest">
                    {classData.startTime} - {classData.endTime}
                  </p>
                  <p className="text-lg text-gray-100 mt-2 tracking-widest">
                    DOLAZNOST: {getRandomAttendance()}/80
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nema dostupnih podataka o nastavi.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfessorDashboard;