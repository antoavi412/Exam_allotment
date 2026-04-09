import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import HallForm from './components/HallForm';
import InvigilatorForm from './components/InvigilatorForm';
import ExamForm from './components/ExamForm';
import SeatingView from './components/SeatingView';
import AllocationView from './components/AllocationView';
import './index.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentForm />} />
        <Route path="/halls" element={<HallForm />} />
        <Route path="/invigilators" element={<InvigilatorForm />} />
        <Route path="/exams" element={<ExamForm />} />
        <Route path="/seating" element={<SeatingView />} />
        <Route path="/allocation" element={<AllocationView />} />
      </Routes>
    </Router>
  );
}
