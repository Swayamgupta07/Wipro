const outputDiv = document.getElementById("output");
let timeoutId = null;

function updateResult(message, status) {
  if (timeoutId) clearTimeout(timeoutId);

  outputDiv.innerHTML = message;
  outputDiv.className = "result show " + status;

  timeoutId = setTimeout(() => {
    outputDiv.classList.remove("show");

    setTimeout(() => {
      if (!outputDiv.classList.contains("show")) {
        outputDiv.innerHTML = "Results will appear here";
        outputDiv.className = "result";
      }
    }, 300);
  }, 3000);
}

function checkEmail() {
  let email = document.getElementById("Email").value;
  let regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (regex.test(email)) {
    updateResult("Valid Email Address", "valid");
  } else {
    updateResult("Invalid Email Address", "invalid");
  }
}

function checkPassword() {
  let password = document.getElementById("Password").value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (regex.test(password)) {
    updateResult("Valid Password (Strong)", "valid");
  } else {
    updateResult("Invalid Password format", "invalid");
  }
}

function checkMobile() {
  let text = document.getElementById("Phone").value;
  let regex = /^[6-9]\d{9}$/;

  if (regex.test(text)) {
    updateResult("Mobile Number is Valid", "valid");
  } else {
    updateResult("Invalid Indian Mobile Number", "invalid");
  }
}

function checkNumber() {
  let text = document.getElementById("Extract").value;
  let regex = /\d+/g;
  let result = text.match(regex);

  if (result) {
    updateResult("Extracted Numbers: " + result.join(", "), "info");
  } else {
    updateResult("No numbers found", "invalid");
  }
}

function replaceSpaces() {
  let text = document.getElementById("textnumber").value;
  let regex = /\s+/g;
  let result = text.replace(regex, "*");

  updateResult("Updated Text: " + result, "info");
}
