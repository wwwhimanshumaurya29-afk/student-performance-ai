const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// baaki code same rahega...
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
const predictRoute = require('./routes/predict');
const studentRoute = require('./routes/student');


app.use('/api/predict', predictRoute);
app.use('/api/students', studentRoute);


app.get('/', (req, res) => {
  res.json({ status: 'Student Performance Backend is running' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));