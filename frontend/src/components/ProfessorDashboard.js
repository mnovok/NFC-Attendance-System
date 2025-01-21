import React, { useState, useEffect } from 'react';

function ProfessorDashboard() {
  // Sample data for student classes (you will later fetch this from an API)
  const [attendanceData, setAttendanceData] = useState([]);
  const [email, setEmail] = useState('profesor Gotovac'); // This should be passed via props or fetched from a context

  useEffect(() => {
    // Here we simulate an API call for attendance data
    // In a real app, you'd fetch this data from an API endpoint
    const mockAttendanceData = [
      { day: 'danas', className: 'Napredne arhitekture računala', status: 'Održano', type:'predavanje' },
      { day: '09.01.2025.', className: 'Paralelno programiranje', status: 'Neodržano', type:'predavanje' },
      { day: '07.01.2025.', className: 'GRID računalni sustavi', status: 'Održano', type:'vjezbe' },
    ];

    // Grouping the data by day
    const groupedByDay = mockAttendanceData.reduce((acc, curr) => {
      const day = curr.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(curr);
      return acc;
    }, {});

    // Sorting days by latest first
    const sortedDays = Object.keys(groupedByDay).sort((a, b) => new Date(b) - new Date(a));

    setAttendanceData(groupedByDay);
  }, []);

  const getCardColor = (type) => {
    switch (type) {
      case 'predavanje':
        return 'bg-blue-500'; 
      case 'lab':
        return 'bg-red-500'; 
      case 'vjezbe':
        return 'bg-green-500'; 
      default:
        return 'bg-gray-500'; 
    }
  };

  const calculateAttendance = (classes) => {
    const total = classes.length;
    const attended = classes.filter((classData) => classData.status === 'Prisutan').length;
    return `${attended}/13`;
  };


  return (
<div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">
  <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center">
    <h1 className="text-4xl font-bold mb-6 text-blue-900 tracking-wide">Dobrodošli, {email}</h1>

    {/* Attendance Cards */}
    {Object.keys(attendanceData).length > 0 ? (
      Object.keys(attendanceData).map((day) => (
        <div key={day} className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 tracking-wider">{day}</h2>
          {attendanceData[day].map((classData, index) => (
            <div
              key={index}
              className={`mb-6 p-5 rounded-lg shadow-lg ${getCardColor(classData.type)} transition-all`}
            >
              <h3 className="text-xl font-semibold text-white mb-2 tracking-wider font-bold">{classData.className}</h3>
              <p
                className={`text-xl ${
                  classData.status === 'Održano' ? 'text-green-200' : 'text-red-200'
                } tracking-wide`}
              >
                {classData.status}
              </p>
              <p className="text-lg text-gray-100 mt-2 tracking-widest">
                {calculateAttendance(attendanceData[day])}
              </p>
              <p className="text-lg text-gray-100 mt-2 tracking-widest">
                70/100
              </p>
            </div>
          ))}
        </div>
      ))
    ) : (
      <p className="text-gray-500">Nedostupni podaci o prisutnosti.</p>
    )}
  </div>
</div>

  );
}

export default ProfessorDashboard;