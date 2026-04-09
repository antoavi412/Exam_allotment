import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, halls: 0, exams: 0, invigilators: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, hallsRes, examsRes, invRes] = await Promise.all([
        API.get('/students'),
        API.get('/halls'),
        API.get('/exams'),
        API.get('/invigilators')
      ]);
      setStats({
        students: studentsRes.data.length,
        halls: hallsRes.data.length,
        exams: examsRes.data.length,
        invigilators: invRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-lightgray p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-navy">Total Students</h3>
          <p className="text-4xl font-bold text-navy">{stats.students}</p>
        </div>
        <div className="bg-lightgray p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-navy">Total Halls</h3>
          <p className="text-4xl font-bold text-navy">{stats.halls}</p>
        </div>
        <div className="bg-lightgray p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-navy">Total Exams</h3>
          <p className="text-4xl font-bold text-navy">{stats.exams}</p>
        </div>
        <div className="bg-lightgray p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-navy">Total Invigilators</h3>
          <p className="text-4xl font-bold text-navy">{stats.invigilators}</p>
        </div>
      </div>
    </div>
  );
}
