import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <h1 className="nav-title">Exam Seating System</h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Dashboard</Link></li>
          <li><Link to="/students" className="nav-link">Students</Link></li>
          <li><Link to="/halls" className="nav-link">Halls</Link></li>
          <li><Link to="/invigilators" className="nav-link">Invigilators</Link></li>
          <li><Link to="/exams" className="nav-link">Exams</Link></li>
          <li><Link to="/seating" className="nav-link">Seating</Link></li>
          <li><Link to="/allocation" className="nav-link">Allocations</Link></li>
        </ul>
      </div>
    </nav>
  );
}
