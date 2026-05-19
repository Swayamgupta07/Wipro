export const validateStudent = (req, res, next) => {
    const { name, course, marks } = req.body;
    
    if (!name || name.trim() === "") {
        return res.status(400).send("Validation Error: Student Name is required!");
    }
    
    if (!course || course.trim() === "") {
        return res.status(400).send("Validation Error: Course Name is required!");
    }
    
    const parsedMarks = parseInt(marks);
    if (isNaN(parsedMarks) || parsedMarks < 0 || parsedMarks > 100) {
        return res.status(400).send("Validation Error: Marks must be a number between 0 and 100!");
    }
    
    req.body.name = name.trim();
    req.body.course = course.trim();
    req.body.marks = parsedMarks;
    
    next();
};
