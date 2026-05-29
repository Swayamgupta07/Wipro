const API_URL = 'http://localhost:4000/students';
let studentModal;

document.addEventListener('DOMContentLoaded', () => {
    studentModal = new bootstrap.Modal(document.getElementById('studentModal'));
    
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);

    fetchStudents();
});

async function fetchStudents() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">Loading data...</td></tr>';
    
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success) {
            renderTable(result.data);
        } else {
            showAlert('Failed to load students', 'danger');
        }
    } catch (error) {
        console.error("API Error:", error);
        showAlert('Cannot connect to server. Ensure Assignment 12 is running!', 'danger');
    }
}

function renderTable(students) {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = ''; 

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No students found.</td></tr>';
        return;
    }

    students.forEach(student => {
        const tr = document.createElement('tr');
        const safeStudent = JSON.stringify(student).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        
        tr.innerHTML = `
            <td class="ps-4 fw-bold text-secondary">#${student.rollno}</td>
            <td class="fw-bold">${student.name}</td>
            <td><span class="badge bg-light text-dark border">${student.course}</span></td>
            <td>${student.email}</td>
            <td>${student.city}</td>
            <td class="text-end pe-4">
                <button class="btn btn-sm btn-light text-primary me-2 shadow-sm rounded-circle" style="width: 35px; height: 35px;" onclick="openEditModal(${safeStudent})">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-sm btn-light text-danger shadow-sm rounded-circle" style="width: 35px; height: 35px;" onclick="deleteStudent('${student.rollno}')">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showAddForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('formMode').value = 'add';
    document.getElementById('rollno').readOnly = false; // Allow typing rollno
    document.getElementById('studentModalLabel').innerText = 'Add New Student';
    document.getElementById('saveBtn').innerText = 'Save Student';
    studentModal.show();
}

function openEditModal(student) {
    document.getElementById('studentForm').reset();
    document.getElementById('formMode').value = 'edit';
    document.getElementById('studentId').value = student.rollno;
    
    document.getElementById('name').value = student.name;
    document.getElementById('rollno').value = student.rollno;
    document.getElementById('rollno').readOnly = true; 
    document.getElementById('course').value = student.course;
    document.getElementById('age').value = student.age;
    document.getElementById('email').value = student.email;
    document.getElementById('city').value = student.city;

    document.getElementById('studentModalLabel').innerText = 'Edit Student Record';
    document.getElementById('saveBtn').innerText = 'Update Changes';
    studentModal.show();
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const mode = document.getElementById('formMode').value;
    const rollnoId = document.getElementById('studentId').value;
    
    const studentData = {
        name: document.getElementById('name').value,
        rollno: document.getElementById('rollno').value,
        course: document.getElementById('course').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value,
    };

    try {
        let response;
        if (mode === 'add') {
            response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
        } else {
            response = await fetch(`${API_URL}/update/${rollnoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
        }

        const result = await response.json();
        
        if (response.ok && result.success) {
            studentModal.hide();
            showAlert(result.message, 'success');
            fetchStudents(); // Refresh table
        } else {
            alert(result.message || 'Validation Error');
        }
    } catch (error) {
        console.error("Submit Error:", error);
        alert('Server error while saving.');
    }
}

async function deleteStudent(rollno) {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
        const response = await fetch(`${API_URL}/delete/${rollno}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            showAlert('Student deleted successfully!', 'success');
            fetchStudents(); 
        } else {
            showAlert(result.message || 'Error deleting student', 'danger');
        }
    } catch (error) {
        console.error("Delete Error:", error);
        showAlert('Server error while deleting.', 'danger');
    }
}

function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.className = `alert alert-${type} alert-dismissible fade show shadow-sm`;
    alertBox.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    setTimeout(() => { alertBox.classList.add('d-none'); }, 4000);
}
