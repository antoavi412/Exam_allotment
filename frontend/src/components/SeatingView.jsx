import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function SeatingView() {
  const [exams, setExams] = useState([]);
  const [halls, setHalls] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [seating, setSeating] = useState([]);
  const [generated, setGenerated] = useState(false);

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

  const generateSeating = async () => {
    if (!selectedExam) {
      alert('Select an exam');
      return;
    }
    try {
      const hallIds = halls.map(h => h.id);
      const res = await API.post(`/seating/generate/${selectedExam}`, hallIds);
      setSeating(res.data);
      setGenerated(true);
    } catch (error) {
      console.error('Error generating seating:', error);
      alert('Error generating seating');
    }
  };

  const viewSeating = async () => {
    if (!selectedExam) {
      alert('Select an exam');
      return;
    }
    try {
      const res = await API.get(`/seating/${selectedExam}`);
      setSeating(res.data);
      setGenerated(true);
    } catch (error) {
      console.error('Error fetching seating:', error);
    }
  };

  const groupByHall = () => {
    const grouped = {};
    seating.forEach(s => {
      if (!grouped[s.hall.id]) {
        grouped[s.hall.id] = [];
      }
      grouped[s.hall.id].push(s);
    });
    return grouped;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Seating Arrangement</h2>
      <div className="bg-lightgray p-6 rounded-lg mb-8">
        <div className="flex gap-4 mb-4">
          <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} className="border p-2 rounded flex-1">
            <option value="">Select Exam</option>
            {exams.map(e => (
              <option key={e.id} value={e.id}>{e.subjectName} - {e.examDate}</option>
            ))}
          </select>
          <button onClick={generateSeating} className="bg-navy text-white px-6 py-2 rounded hover:bg-blue-900">Generate Seating</button>
          <button onClick={viewSeating} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">View Seating</button>
        </div>
      </div>
      
      {generated && seating.length > 0 && (
        <div>
          {Object.entries(groupByHall()).map(([hallId, hallSeating]) => {
            const hall = halls.find(h => h.id === parseInt(hallId));
            return (
              <div key={hallId} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-navy">{hall?.hallName} (Grid: {hall?.rows} × {hall?.columns})</h3>
                <div className="grid gap-2 mb-6" style={{gridTemplateColumns: `repeat(${hall?.columns}, minmax(100px, 1fr))`}}>
                  {hallSeating.map((s, idx) => (
                    <div key={idx} className="border-2 border-navy bg-white p-4 rounded text-center">
                      <div className="text-xs font-semibold text-navy">{s.seatNumber}</div>
                      <div className="text-sm font-bold">{s.student.rollNumber}</div>
                      <div className="text-xs">{s.student.studentName}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
