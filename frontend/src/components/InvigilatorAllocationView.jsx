import { useState, useEffect } from 'react';
import API from '../api/axios';
import './Form.css';

export default function InvigilatorAllocationView() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await API.get('/exams');
      setExams(res.data);
    } catch (err) {
      console.error('Error fetching exams:', err);
    }
  };

  const handleAllocate = async () => {
    if (!selectedExam) {
      alert('Please select an exam');
      return;
    }
    setLoading(true);
    try {
      await API.post(`/invigilator/allocate/${selectedExam}`);
      const res = await API.get(`/invigilator/allocation/${selectedExam}`);
      setAllocations(res.data);
    } catch (err) {
      alert('Error allocating invigilators');
    }
    setLoading(false);
  };

  const handleView = async () => {
    if (!selectedExam) {
      alert('Please select an exam');
      return;
    }
    try {
      const res = await API.get(`/invigilator/allocation/${selectedExam}`);
      setAllocations(res.data);
    } catch (err) {
      alert('Error fetching allocations');
    }
  };

  return (
    <div className="form-container">
      <h2>Invigilator Allocation</h2>
      <div className="controls" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} style={{ flex: 1 }}>
          <option value="">Select Exam</option>
          {exams.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.subjectName} - {ex.examDate}
            </option>
          ))}
        </select>
        <button onClick={handleAllocate} disabled={loading}>{loading ? 'Allocating...' : 'Allocate'}</button>
        <button onClick={handleView}>View Allocation</button>
      </div>

      {allocations.length > 0 && (
        <>
          <h3>Allocation Details</h3>
          <table>
            <thead>
              <tr>
                <th>Hall</th>
                <th>Invigilator</th>
                <th>Department</th>
                <th>Assigned Count</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((alloc) => (
                <tr key={alloc.id}>
                  <td>{alloc.hall.hallName}</td>
                  <td>{alloc.invigilator.invigilatorName}</td>
                  <td>{alloc.invigilator.department}</td>
                  <td>{alloc.invigilator.assignedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
