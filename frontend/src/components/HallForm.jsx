import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function HallForm() {
  const [halls, setHalls] = useState([]);
  const [form, setForm] = useState({ hallName: '', capacity: '', rows: '', columns: '' });

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      const res = await API.get('/halls');
      setHalls(res.data);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  const handleAdd = async () => {
    if (!form.hallName || !form.capacity || !form.rows || !form.columns) {
      alert('Fill all fields');
      return;
    }
    try {
      await API.post('/halls', {
        hallName: form.hallName,
        capacity: parseInt(form.capacity),
        rows: parseInt(form.rows),
        columns: parseInt(form.columns)
      });
      setForm({ hallName: '', capacity: '', rows: '', columns: '' });
      fetchHalls();
    } catch (error) {
      console.error('Error adding hall:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Exam Hall Management</h2>
      <div className="bg-lightgray p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Add Hall</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input type="text" placeholder="Hall Name" value={form.hallName} onChange={(e) => setForm({...form, hallName: e.target.value})} className="border p-2 rounded" />
          <input type="number" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({...form, capacity: e.target.value})} className="border p-2 rounded" />
          <input type="number" placeholder="Rows" value={form.rows} onChange={(e) => setForm({...form, rows: e.target.value})} className="border p-2 rounded" />
          <input type="number" placeholder="Columns" value={form.columns} onChange={(e) => setForm({...form, columns: e.target.value})} className="border p-2 rounded" />
          <button onClick={handleAdd} className="bg-navy text-white p-2 rounded hover:bg-blue-900">Add</button>
        </div>
      </div>
      <table className="w-full border-collapse border-2 border-navy">
        <thead className="bg-navy text-white">
          <tr>
            <th className="border-2 border-navy p-2">ID</th>
            <th className="border-2 border-navy p-2">Hall Name</th>
            <th className="border-2 border-navy p-2">Capacity</th>
            <th className="border-2 border-navy p-2">Rows</th>
            <th className="border-2 border-navy p-2">Columns</th>
          </tr>
        </thead>
        <tbody>
          {halls.map(h => (
            <tr key={h.id}>
              <td className="border-2 border-navy p-2">{h.id}</td>
              <td className="border-2 border-navy p-2">{h.hallName}</td>
              <td className="border-2 border-navy p-2">{h.capacity}</td>
              <td className="border-2 border-navy p-2">{h.rows}</td>
              <td className="border-2 border-navy p-2">{h.columns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
