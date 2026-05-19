let students = [
    { id: 1, name: "Ankit", course: "BCA", marks: 88 },
    { id: 2, name: "Riya", course: "MCA", marks: 92 }
];

export const getAllStudents = (req, res) => {
    res.render("index", { students, activePage: "list" });
};

export const renderAddForm = (req, res) => {
    res.render("add", { activePage: "add" });
};

export const saveStudent = (req, res) => {
    const { name, course, marks } = req.body;
    const newStudent = {
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name,
        course,
        marks
    };
    students.push(newStudent);
    res.redirect("/students");
};

export const renderEditForm = (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.render("edit", { student, activePage: "list" });
    } else {
        res.status(404).send("Student not found");
    }
};

export const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, course, marks } = req.body;
    const index = students.findIndex(s => s.id === id);
    
    if (index !== -1) {
        students[index] = { id, name, course, marks };
        res.redirect("/students");
    } else {
        res.status(404).send("Student not found");
    }
};

export const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.redirect("/students");
};
