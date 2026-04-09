import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function InvigilatorForm() {
  const [invigilators, setInvigilators] = useState([]);
  const [form, setForm] = useState({ invigilatorName: '', department: '' });

  useEffect(() => {
    fetchInvigilators();
  }, []);

  const fetchInvigilators = async () => {
    try {
      const res = await API.get('/invigilators');
      setInvigilators(res.data);
    } catch (error) {
      console.error('Error fetching invigilators:', error);
    }
  };

  const handleAdd = async () => {
    if (!form.invigilatorName || !form.department) {
      alert('Fill all fields');
      return;
    }
    try {
      await API.post('/invigilators', form);
      setForm({ invigilatorName: '', department: '' });
      fetchInvigilators();
    } catch (error) {
      console.error('Error adding invigilator:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Invigilator Management</h2>
      <div className="bg-lightgray p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add Invigilator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Name" value={form.invigilatorName} onChange={(e) => setForm({...form, invigilatorName: e.target.value})} className="border p-2 rounded" />
          <input type="text" placeholder="Department" value={form.department} onChange={(e) => setForm({...form, department: e.target.value})} className="border p-2 rounded" />
          <button onClick={handleAdd} className="bg-navy text-white p-2 rounded hover:bg-blue-900">Add</button>
        </div>
      </div>
      <table className="w-full border-collapse border-2 border-navy">
        <thead className="bg-navy text-white">
          <tr>
            <th className="border-2 border-navy p-2">ID</th>
            <th className="border-2 border-navy p-2">Name</th>
            <th className="border-2 border-navy p-2">Department</th>
            <th className="border-2 border-navy p-2">Assigned Count</th>
          </tr>
        </thead>
        <tbody>
          {invigilators.map(inv => (
            <tr key={inv.id}>
              <td className="border-2 border-navy p-2">{inv.id}</td>
              <td className="border-2 border-navy p-2">{inv.invigilatorName}</td>
              <td className="border-2 border-navy p-2">{inv.department}</td>
              <td className="border-2 border-navy p-2">{inv.assignedCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
