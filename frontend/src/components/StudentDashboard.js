import React, { useState, useEffect } from 'react';

function StudentDashboard() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [email, setEmail] = useState('Jakov Bejo'); // This should be passed via props or fetched from a context
  const [loading, setLoading] = useState(true);
  const studentId = 'CF4E81E'; // Use the actual studentId here

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/attendances/${studentId}`);
        const data = await response.json();
        console.log('Fetched attendance data:', data); // Debug log

        if (response.ok) {
          setAttendanceData(data); // Set the data directly
        } else {
          console.error('Error fetching attendance data:', data);
        }
      } catch (err) {
        console.error('Error fetching attendance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [studentId]);

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-900 tracking-wide">Dobrodošli, {email}</h1>

        {/* Attendance Cards */}
        {loading ? (
          <p className="text-gray-500">Učitavanje podataka o prisutnosti...</p>
        ) : attendanceData.length > 0 ? (
          attendanceData.map((classData, index) => (
            <div key={index} className="mb-8">
              {/* Display Day Above Each Card */}
              <h2 className="text-3xl font-semibold text-gray-700 mb-4 tracking-wider">
                25.01.2025.
              </h2>
              <div
                className={`mb-6 p-5 rounded-lg shadow-lg ${getCardColor(classData.classId.type)} transition-all`}
              >
                <h3 className="text-xl font-semibold text-white mb-2 tracking-wider font-bold">{classData.classId.name}</h3>
                <p
                  className={`text-xl ${
                    classData.status === 'Prisutan' ? 'text-green-200' : 'text-red-200'
                  } tracking-wide`}
                >
                  {classData.status}
                </p>
                <p className="text-lg text-gray-100 mt-2 tracking-widest">
                1/13
              </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nedostupni podaci o prisutnosti.</p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
