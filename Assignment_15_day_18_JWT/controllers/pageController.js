module.exports.home_get = (req, res) => res.render('index', { page: 'home' });
module.exports.about_get = (req, res) => res.render('index', { page: 'about' });
module.exports.contact_get = (req, res) => res.render('index', { page: 'contact' });

module.exports.students_get = async (req, res) => {
    try {
        const response = await fetch('http://localhost:4000/students');
        const result = await response.json();
        const students = result.success ? result.data : [];
        
        res.render('students', { students, error: null });
    } catch (err) {
        console.error("API Fetch Error:", err);
        res.render('students', { students: [], error: "Could not connect to Assignment 12 API (localhost:4000). Please ensure it is running." });
    }
};

module.exports.add_student_get = (req, res) => {
    res.render('add-student', { error: null });
};

module.exports.add_student_post = async (req, res) => {
    const { name, rollno, course } = req.body;
    const payload = {
        name,
        rollno,
        course,
        age: 20, 
        email: `${name.replace(/\s/g, '').toLowerCase()}@student.com`,
        city: "Unknown"
    };

    try {
        const response = await fetch('http://localhost:4000/students/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (response.ok && result.success) {
            res.redirect('/');
        } else {
            res.render('add-student', { error: result.message || "Failed to add student. Rollno might already exist." });
        }
    } catch (err) {
        console.error("API Post Error:", err);
        res.render('add-student', { error: "Cannot connect to Assignment 12 API. Is it running on port 4000?" });
    }
};
