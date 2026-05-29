require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentApiDB';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB successfully connected...'))
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to the Student REST API. Use /students endpoints.' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
