let students = [
    { id: 1, name: 'Ankit', course: 'MCA', marks: 88 },
    { id: 2, name: 'Riya', course: 'BCA', marks: 92 }
];

exports.getAllStudents = (req, res) => {
    res.render('index', { students });
};

exports.showAddForm = (req, res) => {
    res.render('addStudent');
};

exports.addStudent = (req, res) => {
    const { name, course, marks } = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        course,
        marks
    };

    students.push(newStudent);

    res.redirect('/');
};

exports.showEditForm = (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    res.render('editStudent', { student });
};

exports.updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, course, marks } = req.body;

    const student = students.find(s => s.id === id);
    if (student) {
        student.name = name;
        student.course = course;
        student.marks = parseInt(marks);
    }

    res.redirect('/');
};

exports.deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.redirect('/');
};
