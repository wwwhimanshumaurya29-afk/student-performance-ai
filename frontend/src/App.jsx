import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import PredictionResult from './components/PredictionResult';
import Dashboard from './components/Dashboard';
import './App.css';

function PredictPage() {
  const [result, setResult] = useState(null);
  return (
    <>
      {!result ? (
        <StudentForm onResult={setResult} />
      ) : (
        <PredictionResult result={result} onReset={() => setResult(null)} />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>AI-Driven Student Performance System</h1>
          <p>Predict academic performance and identify at-risk students using ML</p>
          <nav className="nav-bar">
            <Link to="/">Predict</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<PredictPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;