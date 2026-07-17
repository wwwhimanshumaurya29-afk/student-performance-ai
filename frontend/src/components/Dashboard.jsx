import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RISK_COLORS = { Low: '#2ecc71', Medium: '#f39c12', High: '#e74c3c' };

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/students`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/students/${id}`);
      setStudents(students.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="loading-text">Loading dashboard...</p>;

  const riskCounts = ['Low', 'Medium', 'High'].map(level => ({
    name: level,
    value: students.filter(s => s.risk_level === level).length
  }));

  const avgScoreData = students.slice(-10).map((s, i) => ({
    name: s.name || `Student ${i + 1}`,
    score: s.predicted_score
  }));

  return (
    <div className="dashboard">
      <h2>Class Dashboard</h2>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-number">{students.length}</span>
          <span className="stat-label">Total Students</span>
        </div>
        <div className="stat-card">
          <span className="stat-number" style={{ color: '#e74c3c' }}>
            {students.filter(s => s.risk_level === 'High').length}
          </span>
          <span className="stat-label">High Risk</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {students.length > 0
              ? (students.reduce((a, s) => a + s.predicted_score, 0) / students.length).toFixed(1)
              : 0}
          </span>
          <span className="stat-label">Avg Predicted Score</span>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-box">
          <h3>Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={riskCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {riskCounts.map((entry, i) => (
                  <Cell key={i} fill={RISK_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Recent Scores</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgScoreData}>
              <XAxis dataKey="name" hide />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Bar dataKey="score" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="student-table-wrap">
        <h3>All Students</h3>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Predicted Score</th>
              <th>Risk Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.predicted_score}</td>
                <td>
                  <span className="risk-badge-small" style={{ backgroundColor: RISK_COLORS[s.risk_level] }}>
                    {s.risk_level}
                  </span>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && <p className="loading-text">No students yet. Add one from the Predict page.</p>}
      </div>
    </div>
  );
}

export default Dashboard;