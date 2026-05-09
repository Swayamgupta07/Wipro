const divideNumbers = () => {
  try {
    const num = parseInt(document.getElementById("num").value);
    const den = parseInt(document.getElementById("den").value);

    var res = num / den;
    alert("Result of division: " + res);
    console.log("Result of division: " + res);
  } catch (error) {
    alert("Error: " + error.message);
    console.log("Caught Exception: " + error.message);
  } finally {
    console.log("Division operation attempt finished.");
  }
};

const checkAge = () => {
  try {
    const age = parseInt(document.getElementById("ageInput").value);
    if (age < 18) {
      alert("Age must be at least 18");
    } else {
      alert("Eligible to Vote");
    }
  } catch (error) {
    alert("Age Error: " + error.message);
    console.log("Age Validation Error:", error.message);
  } finally {
    console.log("Age validation completed");
  }
};

const validateUsername = () => {
  try {
    const username = document.getElementById("usernameInput").value;
    if (username.length < 5) {
      alert(
        "InvalidUsernameError: Username length must be at least 5 characters",
      );
    } else {
      alert("Username is valid: " + username);
    }
  } catch (error) {
    alert(error.message);
    console.log(error.message);
  } finally {
    console.log("Username validation completed");
  }
};

const calculator = (operation, val1, val2) => {
  try {
    const a = parseFloat(val1);
    const b = parseFloat(val2);

    if (isNaN(a) || isNaN(b)) {
      throw new TypeError("Invalid Input: One or both values are not numbers");
    }

    if (operation === "add") {
      const sum = a + b;
      alert("Addition Result: " + sum);
      console.log("Addition Result: " + sum);
    } else if (operation === "divide") {
      if (b === 0) {
        throw new RangeError("Division Error: Cannot divide by zero");
      }
      const quotient = a / b;
      alert("Division Result: " + quotient);
      console.log("Division Result: " + quotient);
    }
  } catch (error) {
    alert("Error: " + error.message);
    console.log("Error " + error.message);
  } finally {
    console.log("Calculator operation completed");
  }
};

const handleCalculator = (op) => {
  const v1 = document.getElementById("calcVal1").value;
  const v2 = document.getElementById("calcVal2").value;
  calculator(op, v1, v2);
};
