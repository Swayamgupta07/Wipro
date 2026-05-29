class FormValidator {
    /**
     * Validates student registration data
     * @param {Student} student - The student object to validate
     * @throws {Error} - Throws error if validation fails     */
    static validate(student) {
        // Exception handling for empty fields
        if (!student.name.trim()) {
            throw new Error("Name is required!");
        }
        if (!student.email.trim()) {
            throw new Error("Email is required!");
        }
        if (!student.password.trim()) {
            throw new Error("Password is required!");
        }

        // Name validation (min 3 characters)
        if (student.name.trim().length < 3) {
            throw new Error("Name must be at least 3 characters long!");
        }

        // Email validation using RegEx
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(student.email)) {
            throw new Error("Invalid email format! Example: user@example.com");
        }

        // Password validation (min 8 characters with required criteria)
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        if (!passwordPattern.test(student.password)) {
            throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!");
        }

        // If everything is fine, return true
        return true;
    }
}
