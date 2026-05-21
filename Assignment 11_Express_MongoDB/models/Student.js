const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  rollno: {
    type: Number,
    required: [true, 'Roll number is required'],
    unique: true
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be greater than 15']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  }
});

module.exports = mongoose.model('Student', studentSchema);
