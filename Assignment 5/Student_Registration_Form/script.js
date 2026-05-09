document.getElementById("registrationForm").addEventListener("submit", function(event) {
    // Prevent default form submission(to stop refresh)
    event.preventDefault();

    const messageDiv = document.getElementById("message");
    messageDiv.className = "message"; //sets Css class to only be "message"
    messageDiv.style.display = "none"; //hides the message box

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Create new Student instance (OOPS)
        const newStudent = new Student(name, email, password);

        // Validate student data (This might throw exceptions)
        FormValidator.validate(newStudent);

        // If validation passes, display success message
        messageDiv.innerText = "Registration Successful!";
        messageDiv.classList.add("success");
        messageDiv.style.display = "block";

    } catch (error) {
        // Show error in alert box
        alert("Error: " + error.message);
        
        // Also update the message div for visual reference
        messageDiv.innerText = "Error: " + error.message;
        messageDiv.classList.add("error");
        messageDiv.style.display = "block";
        console.error("Validation failed:", error.message);
    }
});
