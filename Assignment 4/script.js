const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const totalDisplay = document.getElementById('totalDisplay');
const b002Display = document.getElementById('b002Display');

let students = [];

studentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const student = {
        id: Date.now(),
        name: document.getElementById('studentName').value,
        address: document.getElementById('studentAddress').value,
        batch: document.getElementById('studentBatch').value
    };

    students.push(student);
    renderStudents();
    studentForm.reset();
});

function renderStudents() {
    studentList.innerHTML = '';
    
    let b002Count = 0;

    students.forEach(student => {
        if (student.batch === 'B002') b002Count++;

        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div>
                    <h4 style="margin: 0; color: #000;">${student.name}</h4>
                    <div style="font-size: 13px; color: #444; margin-top: 2px;">
                        <span>${student.address}</span> | <span>Batch: ${student.batch}</span>
                    </div>
                </div>
                <button type="button" class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})" style="flex: none; padding: 2px 8px; font-size: 11px; line-height: 1.5; width: auto; height: auto;">Delete</button>
            </div>
        `;
        studentList.appendChild(studentCard);
    });

    totalDisplay.innerText = students.length;
    b002Display.innerText = b002Count;
}

function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        students = students.filter(s => s.id !== id);
        renderStudents();
    }
}