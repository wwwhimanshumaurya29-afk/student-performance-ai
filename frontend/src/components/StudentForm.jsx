import { useState } from 'react';
import axios from 'axios';

const initialState = {
  name: '', school: 'GP', sex: 'F', age: 17, address: 'U', famsize: 'GT3',
  Pstatus: 'T', Medu: 3, Fedu: 2, Mjob: 'other', Fjob: 'other', reason: 'course',
  guardian: 'mother', traveltime: 1, studytime: 2, failures: 0, schoolsup: 'no',
  famsup: 'yes', paid: 'no', activities: 'yes', nursery: 'yes', higher: 'yes',
  internet: 'yes', romantic: 'no', famrel: 4, freetime: 3, goout: 3,
  Dalc: 1, Walc: 1, health: 3, absences: 0
};

function StudentForm({ onResult }) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, formData);
      onResult(res.data);
    } catch (err) {
      setError('Prediction failed. Check backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>Student Details</h2>

      <div className="form-group">
        <label>Student Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="22" />
        </div>
        <div className="form-group">
          <label>Sex</label>
          <select name="sex" value={formData.sex} onChange={handleChange}>
            <option value="F">Female</option>
            <option value="M">Male</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>School</label>
          <select name="school" value={formData.school} onChange={handleChange}>
            <option value="GP">GP</option>
            <option value="MS">MS</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address Type</label>
          <select name="address" value={formData.address} onChange={handleChange}>
            <option value="U">Urban</option>
            <option value="R">Rural</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Family Size</label>
          <select name="famsize" value={formData.famsize} onChange={handleChange}>
            <option value="LE3">≤ 3</option>
            <option value="GT3">&gt; 3</option>
          </select>
        </div>
        <div className="form-group">
          <label>Parent Status</label>
          <select name="Pstatus" value={formData.Pstatus} onChange={handleChange}>
            <option value="T">Together</option>
            <option value="A">Apart</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Mother's Education (0-4)</label>
          <input type="number" name="Medu" value={formData.Medu} onChange={handleChange} min="0" max="4" />
        </div>
        <div className="form-group">
          <label>Father's Education (0-4)</label>
          <input type="number" name="Fedu" value={formData.Fedu} onChange={handleChange} min="0" max="4" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Mother's Job</label>
          <select name="Mjob" value={formData.Mjob} onChange={handleChange}>
            <option value="teacher">Teacher</option>
            <option value="health">Health</option>
            <option value="services">Services</option>
            <option value="at_home">At Home</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Father's Job</label>
          <select name="Fjob" value={formData.Fjob} onChange={handleChange}>
            <option value="teacher">Teacher</option>
            <option value="health">Health</option>
            <option value="services">Services</option>
            <option value="at_home">At Home</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Study Time (1-4)</label>
          <input type="number" name="studytime" value={formData.studytime} onChange={handleChange} min="1" max="4" />
        </div>
        <div className="form-group">
          <label>Past Failures</label>
          <input type="number" name="failures" value={formData.failures} onChange={handleChange} min="0" max="4" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Travel Time (1-4)</label>
          <input type="number" name="traveltime" value={formData.traveltime} onChange={handleChange} min="1" max="4" />
        </div>
        <div className="form-group">
          <label>Absences</label>
          <input type="number" name="absences" value={formData.absences} onChange={handleChange} min="0" max="100" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>School Support</label>
          <select name="schoolsup" value={formData.schoolsup} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Family Support</label>
          <select name="famsup" value={formData.famsup} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Extra Paid Classes</label>
          <select name="paid" value={formData.paid} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Extracurricular Activities</label>
          <select name="activities" value={formData.activities} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Attended Nursery</label>
          <select name="nursery" value={formData.nursery} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Wants Higher Education</label>
          <select name="higher" value={formData.higher} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Internet Access</label>
          <select name="internet" value={formData.internet} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>In a Relationship</label>
          <select name="romantic" value={formData.romantic} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Family Relationship (1-5)</label>
          <input type="number" name="famrel" value={formData.famrel} onChange={handleChange} min="1" max="5" />
        </div>
        <div className="form-group">
          <label>Free Time (1-5)</label>
          <input type="number" name="freetime" value={formData.freetime} onChange={handleChange} min="1" max="5" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Going Out (1-5)</label>
          <input type="number" name="goout" value={formData.goout} onChange={handleChange} min="1" max="5" />
        </div>
        <div className="form-group">
          <label>Health Status (1-5)</label>
          <input type="number" name="health" value={formData.health} onChange={handleChange} min="1" max="5" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Weekday Alcohol (1-5)</label>
          <input type="number" name="Dalc" value={formData.Dalc} onChange={handleChange} min="1" max="5" />
        </div>
        <div className="form-group">
          <label>Weekend Alcohol (1-5)</label>
          <input type="number" name="Walc" value={formData.Walc} onChange={handleChange} min="1" max="5" />
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Predicting...' : 'Predict Performance'}
      </button>
    </form>
  );
}

export default StudentForm;