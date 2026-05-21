const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  rollno: {
    type: Number,
    required: true,
    unique: true
  },
  course: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: [16, 'Age must be greater than 15']
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email format']
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);