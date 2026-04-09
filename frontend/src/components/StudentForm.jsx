import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function StudentForm() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentName: '', rollNumber: '', department: '', semester: 4 });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get('/students');
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAdd = async () => {
    if (!form.studentName || !form.rollNumber || !form.department) {
      alert('Fill all fields');
      return;
    }
    try {
      await API.post('/students', form);
      setForm({ studentName: '', rollNumber: '', department: '', semester: 4 });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Student Management</h2>
      <div className="bg-lightgray p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add Student</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Name" value={form.studentName} onChange={(e) => setForm({...form, studentName: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Roll Number" value={form.rollNumber} onChange={(e) => setForm({...form, rollNumber: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Department" value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} className="border p-2 rounded" />
          <button onClick={handleAdd} className="bg-navy text-white p-2 rounded hover:bg-blue-900">Add</button>
        </div>
      </div>
      <table className="w-full border-collapse border-2 border-navy">
        <thead className="bg-navy text-white">
          <tr>
            <th className="border-2 border-navy p-2">ID</th>
            <th className="border-2 border-navy p-2">Name</th>
            <th className="border-2 border-navy p-2">Roll Number</th>
            <th className="border-2 border-navy p-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td className="border-2 border-navy p-2">{s.id}</td>
              <td className="border-2 border-navy p-2">{s.studentName}</td>
              <td className="border-2 border-navy p-2">{s.rollNumber}</td>
              <td className="border-2 border-navy p-2">{s.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
