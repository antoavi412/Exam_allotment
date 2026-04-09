import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function ExamForm() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({ subjectName: '', examDate: '', examTime: '', department: '', semester: 4 });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await API.get('/exams');
      setExams(res.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleAdd = async () => {
    if (!form.subjectName || !form.examDate || !form.examTime || !form.department) {
      alert('Fill all fields');
      return;
    }
    try {
      await API.post('/exams', form);
      setForm({ subjectName: '', examDate: '', examTime: '', department: '', semester: 4 });
      fetchExams();
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Exam Management</h2>
      <div className="bg-lightgray p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Create Exam</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input type="text" placeholder="Subject" value={form.subjectName} onChange={(e) => setForm({...form, subjectName: e.target.value})} className="border p-2 rounded" />
          <input type="date" value={form.examDate} onChange={(e) => setForm({...form, examDate: e.target.value})} className="border p-2 rounded" />
          <input type="time" value={form.examTime} onChange={(e) => setForm({...form, examTime: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Department" value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} className="border p-2 rounded" />
          <input type="number" placeholder="Semester" value={form.semester} onChange={(e) => setForm({...form, semester: parseInt(e.target.value)})} className="border p-2 rounded" />
          <button onClick={handleAdd} className="bg-navy text-white p-2 rounded hover:bg-blue-900">Add</button>
        </div>
      </div>
      <table className="w-full border-collapse border-2 border-navy">
        <thead className="bg-navy text-white">
          <tr>
            <th className="border-2 border-navy p-2">ID</th>
            <th className="border-2 border-navy p-2">Subject</th>
            <th className="border-2 border-navy p-2">Date</th>
            <th className="border-2 border-navy p-2">Time</th>
            <th className="border-2 border-navy p-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(e => (
            <tr key={e.id}>
              <td className="border-2 border-navy p-2">{e.id}</td>
              <td className="border-2 border-navy p-2">{e.subjectName}</td>
              <td className="border-2 border-navy p-2">{e.examDate}</td>
              <td className="border-2 border-navy p-2">{e.examTime}</td>
              <td className="border-2 border-navy p-2">{e.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
