import { useState } from 'react';
import axios from 'axios';

function PredictionResult({ result, onReset }) {
  const [suggestions, setSuggestions] = useState('');
  const [loadingTips, setLoadingTips] = useState(false);

  if (!result) return null;

  const { predicted_score, risk_level, student } = result;

  const riskColors = {
    Low: '#2ecc71',
    Medium: '#f39c12',
    High: '#e74c3c'
  };

  const getSuggestions = async () => {
    setLoadingTips(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/suggestion`, {
        name: student?.name,
        predicted_score,
        risk_level,
        studytime: student?.studytime,
        failures: student?.failures,
        absences: student?.absences,
        famsup: student?.famsup,
        schoolsup: student?.schoolsup
      });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      setSuggestions('Could not generate suggestions right now.');
    } finally {
      setLoadingTips(false);
    }
  };

  return (
    <div className="result-card">
      <h2>Prediction Result</h2>

      <div className="result-item">
        <span className="result-label">Predicted Final Score</span>
        <span className="result-value">{predicted_score} / 20</span>
      </div>

      <div className="result-item">
        <span className="result-label">Risk Level</span>
        <span className="risk-badge" style={{ backgroundColor: riskColors[risk_level] }}>
          {risk_level}
        </span>
      </div>

      {risk_level !== 'Low' && (
        <div className="suggestion-section">
          {!suggestions ? (
            <button onClick={getSuggestions} disabled={loadingTips} className="ai-btn">
              {loadingTips ? 'Generating tips...' : 'Get AI Improvement Suggestions'}
            </button>
          ) : (
            <div className="suggestion-box">
              <h4>AI Suggestions</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{suggestions}</p>
            </div>
          )}
        </div>
      )}

      {risk_level === 'Low' && (
        <p className="risk-note">This student is on track and performing well.</p>
      )}

      <button onClick={onReset} className="reset-btn">
        Predict Another Student
      </button>
    </div>
  );
}

export default PredictionResult;