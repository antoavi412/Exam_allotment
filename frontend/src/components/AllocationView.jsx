import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function AllocationView() {
  const [exams, setExams] = useState([]);
  const [halls, setHalls] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [allocations, setAllocations] = useState([]);
  const [allocated, setAllocated] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [examsRes, hallsRes] = await Promise.all([
        API.get('/exams'),
        API.get('/halls')
      ]);
      setExams(examsRes.data);
      setHalls(hallsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const allocateInvigilators = async () => {
    if (!selectedExam) {
      alert('Select an exam');
      return;
    }
    try {
      const hallIds = halls.map(h => h.id);
      const res = await API.post(`/invigilator/allocate/${selectedExam}`, hallIds);
      setAllocations(res.data);
      setAllocated(true);
    } catch (error) {
      console.error('Error allocating invigilators:', error);
      alert('Error allocating invigilators');
    }
  };

  const viewAllocations = async () => {
    if (!selectedExam) {
      alert('Select an exam');
      return;
    }
    try {
      const res = await API.get(`/invigilator/allocation/${selectedExam}`);
      setAllocations(res.data);
      setAllocated(true);
    } catch (error) {
      console.error('Error fetching allocations:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Invigilator Allocation</h2>
      <div className="bg-lightgray p-6 rounded-lg mb-8">
        <div className="flex gap-4 mb-4">
          <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="border p-2 rounded flex-1">
            <option value="">Select Exam</option>
            {exams.map(e => (
              <option key={e.id} value={e.id}>{e.subjectName} - {e.examDate}</option>
            ))}
          </select>
          <button onClick={allocateInvigilators} className="bg-navy text-white px-6 py-2 rounded hover:bg-blue-900">Allocate Invigilators</button>
          <button onClick={viewAllocations} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">View Allocations</button>
        </div>
      </div>

      {allocated && allocations.length > 0 && (
        <table className="w-full border-collapse border-2 border-navy">
          <thead className="bg-navy text-white">
            <tr>
              <th className="border-2 border-navy p-2">Hall</th>
              <th className="border-2 border-navy p-2">Invigilator Name</th>
              <th className="border-2 border-navy p-2">Department</th>
              <th className="border-2 border-navy p-2">Assigned Count</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((alloc, idx) => (
              <tr key={idx}>
                <td className="border-2 border-navy p-2">{alloc.hall.hallName}</td>
                <td className="border-2 border-navy p-2">{alloc.invigilator.invigilatorName}</td>
                <td className="border-2 border-navy p-2">{alloc.invigilator.department}</td>
                <td className="border-2 border-navy p-2">{alloc.invigilator.assignedCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
