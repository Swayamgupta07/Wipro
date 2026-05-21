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
    res.render('index', { 
      students, 
      search: search || ''
    });
  } catch (error) {
    res.status(500).send('Server Error: ' + error.message);
  }
};

exports.showAddForm = (req, res) => {
  res.render('addStudent', {
    formData: req.flash('formData')[0] || {}
  });
};

exports.createStudent = async (req, res) => {
  try {
    const { name, rollno, course, age, email, city } = req.body;
    const existingStudent = await Student.findOne({ rollno });
    if (existingStudent) {
      req.flash('error', 'Roll Number already exists! Please use a unique roll number.');
      req.flash('formData', req.body);
      return res.redirect('/students/add');
    }

    const student = new Student({
      name, rollno, course, age, email, city
    });

    await student.save();
    req.flash('success', 'Student record created successfully!');
    res.redirect('/students');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      req.flash('error', messages.join(', '));
    } else {
      req.flash('error', 'Something went wrong: ' + error.message);
    }
    req.flash('formData', req.body);
    res.redirect('/students/add');
  }
};

exports.viewStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      req.flash('error', 'Student not found!');
      return res.redirect('/students');
    }
    res.render('viewStudent', { student });
  } catch (error) {
    req.flash('error', 'Invalid Student ID');
    res.redirect('/students');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      req.flash('error', 'Student not found!');
      return res.redirect('/students');
    }
    res.render('editStudent', { 
      student
    });
  } catch (error) {
    req.flash('error', 'Invalid Student ID');
    res.redirect('/students');
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, course, age, email, city } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      { name, course, age, email, city },
      { new: true, runValidators: true }
    );

    if (!student) {
      req.flash('error', 'Student not found!');
      return res.redirect('/students');
    }

    req.flash('success', 'Student record updated successfully!');
    res.redirect('/students');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      req.flash('error', messages.join(', '));
    } else {
      req.flash('error', 'Update failed: ' + error.message);
    }
    res.redirect(`/students/edit/${req.params.id}`);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      req.flash('error', 'Student not found!');
      return res.redirect('/students');
    }
    req.flash('success', 'Student record deleted successfully!');
    res.redirect('/students');
  } catch (error) {
    req.flash('error', 'Could not delete student: ' + error.message);
    res.redirect('/students');
  }
};
