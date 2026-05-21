require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const MongoStudent = require('./models/MongoStudent');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let mysqlConnection;

async function initDatabases() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected!');

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    const dbName = process.env.DB_NAME;
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        rollno INT NOT NULL UNIQUE,
        course VARCHAR(255) NOT NULL
      );
    `);
    
    mysqlConnection = connection;
    console.log(`MySQL Connected & 'students' table ready!`);
  } catch (error) {
    console.error('Database Initialization Failed:', error.message);
    process.exit(1);
  }
}

app.post('/students', async (req, res) => {
  const { name, rollno, course } = req.body;
  
  try {
    const newMongoStudent = new MongoStudent({ name, rollno, course });
    await newMongoStudent.save();

    const [mysqlResult] = await mysqlConnection.query(
      'INSERT INTO students (name, rollno, course) VALUES (?, ?, ?)',
      [name, rollno, course]
    );

    res.status(201).json({
      success: true,
      message: 'Student added to BOTH databases!',
      mongoData: newMongoStudent,
      mysqlInsertId: mysqlResult.insertId
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const mongoStudents = await MongoStudent.find({}, '-_id name rollno course'); // exclude internal _id for clean comparison

    const [mysqlStudents] = await mysqlConnection.query('SELECT name, rollno, course FROM students');

    res.status(200).json({
      success: true,
      dataFromMongoDB: mongoStudents,
      dataFromMySQL: mysqlStudents
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/students/:rollno', async (req, res) => {
  const rollnoToUpdate = parseInt(req.params.rollno);
  const { name, course } = req.body;

  try {
    const mongoUpdated = await MongoStudent.findOneAndUpdate(
      { rollno: rollnoToUpdate },
      { name, course },
      { new: true }
    );

    if (!mongoUpdated) {
      return res.status(404).json({ success: false, message: 'Student not found with this rollno' });
    }

    const [mysqlResult] = await mysqlConnection.query(
      'UPDATE students SET name = ?, course = ? WHERE rollno = ?',
      [name, course, rollnoToUpdate]
    );

    res.status(200).json({
      success: true,
      message: 'Student updated in BOTH databases!',
      mongoUpdatedData: mongoUpdated,
      mysqlRowsAffected: mysqlResult.affectedRows
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.delete('/students/:rollno', async (req, res) => {
  const rollnoToDelete = parseInt(req.params.rollno);

  try {
    const mongoDeleted = await MongoStudent.findOneAndDelete({ rollno: rollnoToDelete });
    
    if (!mongoDeleted) {
      return res.status(404).json({ success: false, message: 'Student not found with this rollno' });
    }

    const [mysqlResult] = await mysqlConnection.query(
      'DELETE FROM students WHERE rollno = ?',
      [rollnoToDelete]
    );

    res.status(200).json({
      success: true,
      message: 'Student deleted from BOTH databases!',
      mysqlRowsAffected: mysqlResult.affectedRows
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

initDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`\n API Server running at http://localhost:${PORT}`);
  });
});
