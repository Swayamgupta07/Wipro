const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query = {
        $or: [
          { name: searchRegex },
          { course: searchRegex },
          { city: searchRegex }
        ]
      };
    }

    const students = await Student.find(query).sort({ rollno: 1 });
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.viewStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ rollno: req.params.id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found!' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Invalid Student ID' });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, rollno, course, age, email, city } = req.body;
    
    const existingStudent = await Student.findOne({ rollno });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Roll Number already exists!' });
    }

    const student = new Student({
      name, rollno, course, age, email, city
    });

    await student.save();
    res.status(201).json({ success: true, message: 'Student added successfully!', data: student });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(400).json({ success: false, message: 'Something went wrong: ' + error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, course, age, email, city } = req.body;

    const student = await Student.findOneAndUpdate(
      { rollno: req.params.id }, 
      { name, course, age, email, city },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found!' });
    }

    res.json({ success: true, message: 'Student updated successfully!', data: student });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(400).json({ success: false, message: 'Update failed: ' + error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollno: req.params.id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found!' });
    }
    res.json({ success: true, message: 'Student deleted successfully!' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Could not delete student: ' + error.message });
  }
};
