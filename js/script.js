// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page-container').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
}

// Purchase PIN modal
function showPurchaseModal() {
    const modal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    document.getElementById('purchaseForm').style.display = 'block';
    document.getElementById('purchaseSuccess').style.display = 'none';
    modal.show();
}

function completePurchase() {
    const pin = generatePin();
    document.getElementById('generatedPinDisplay').textContent = pin;
    document.getElementById('purchaseForm').style.display = 'none';
    document.getElementById('purchaseSuccess').style.display = 'block';
}

function generatePin() {
    const prefix = "IHS";
    const year = new Date().getFullYear().toString().slice(-2);
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}${year}${randomNum}`;
}

// Result checking
function checkResult(event) {
    event.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const studentClass = document.getElementById('studentClass').value;
    const session = document.getElementById('studentSession').value;
    const pin = document.getElementById('studentPin').value;
    
    // Demo validation
    if (name === "Oluwaseun Adebayo" && studentClass === "SS3" && session === "2024/2025" && pin === "IHS2024001") {
        showResultPage(name, studentClass, session, pin);
    } else {
        alert('Invalid credentials. Please check your details and try again.');
    }
}

function showResultPage(name, studentClass, session, pin) {
    document.getElementById('resultName').textContent = name;
    document.getElementById('resultClass').textContent = studentClass;
    document.getElementById('resultSession').textContent = session;
    document.getElementById('resultPin').textContent = pin;
    
    // Sample subjects data
    const subjects = [
        { name: "Mathematics", score: 85, grade: "A" },
        { name: "English Language", score: 78, grade: "B+" },
        { name: "Physics", score: 92, grade: "A+" },
        { name: "Chemistry", score: 88, grade: "A" },
        { name: "Biology", score: 75, grade: "B" },
        { name: "Geography", score: 90, grade: "A" },
        { name: "Economics", score: 82, grade: "A-" },
        { name: "Literature", score: 79, grade: "B+" }
    ];
    
    const tableBody = document.getElementById('subjectTableBody');
    tableBody.innerHTML = '';
    
    let totalScore = 0;
    
    subjects.forEach(subject => {
        totalScore += subject.score;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.name}</td>
            <td class="text-center">${subject.score}</td>
            <td class="text-center">${subject.grade}</td>
        `;
        tableBody.appendChild(row);
    });
    
    const average = (totalScore / subjects.length).toFixed(1);
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('averageScore').textContent = average;
    
    // Calculate grade based on average
    let grade = 'F';
    if (average >= 90) grade = 'A+';
    else if (average >= 80) grade = 'A';
    else if (average >= 75) grade = 'B+';
    else if (average >= 70) grade = 'B';
    else if (average >= 65) grade = 'C+';
    else if (average >= 60) grade = 'C';
    else if (average >= 50) grade = 'D';
    
    document.getElementById('overallGrade').textContent = grade;
    
    // Set remarks based on performance
    let remarks = '';
    if (average >= 85) remarks = 'Excellent performance! Keep up the good work.';
    else if (average >= 75) remarks = 'Very good performance. Aim higher next time.';
    else if (average >= 65) remarks = 'Good performance. With more effort, you can improve.';
    else if (average >= 50) remarks = 'Fair performance. Focus on improving your weak areas.';
    else remarks = 'Poor performance. Please see your teachers for guidance.';
    
    document.getElementById('resultRemarks').textContent = remarks;
    
    showPage('resultPage');
}

// Admin functions
function adminLogin(event) {
    event.preventDefault();
    showPage('adminDashboardPage');
    loadStudents();
}

function loadStudents() {
    // Demo student data
    const students = [
        { name: "Oluwaseun Adebayo", class: "SS3", session: "2024/2025", pin: "IHS2024001" },
        { name: "Chinwe Okoro", class: "JSS2", session: "2024/2025", pin: "IHS2024002" }
    ];
    
    document.getElementById('studentCount').textContent = students.length;
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = '';
    
    students.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.className = 'd-flex justify-content-between align-items-center p-2 mb-2 border rounded subject-item';
        studentItem.innerHTML = `
            <div>
                <strong>${student.name}</strong><br>
                <small>${student.class} | ${student.session}</small>
            </div>
            <div class="text-end">
                <div class="small fw-bold text-success mb-1">PIN: ${student.pin}</div>
                <button class="btn btn-sm btn-outline-primary">View</button>
            </div>
        `;
        studentsList.appendChild(studentItem);
    });
}

// Subject management
let subjects = [];

function addSubject() {
    const name = document.getElementById('subjectName').value.trim();
    const score = parseInt(document.getElementById('subjectScore').value);
    
    if (!name || isNaN(score) || score < 0 || score > 100) {
        alert('Please enter a valid subject name and score (0-100)');
        return;
    }
    
    subjects.push({ name, score });
    renderSubjectsList();
    
    // Clear inputs
    document.getElementById('subjectName').value = '';
    document.getElementById('subjectScore').value = '';
}

function renderSubjectsList() {
    const container = document.getElementById('subjectsList');
    container.innerHTML = '';
    
    if (subjects.length === 0) {
        container.innerHTML = '<p class="text-muted text-center mb-0">No subjects added yet</p>';
        return;
    }
    
    subjects.forEach((subject, index) => {
        const subjectItem = document.createElement('div');
        subjectItem.className = 'subject-item d-flex justify-content-between align-items-center';
        subjectItem.innerHTML = `
            <div>
                <strong>${subject.name}</strong><br>
                <small>Score: ${subject.score}</small>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeSubject(${index})">
                <i class="bi bi-trash"></i>
            </button>
        `;
        container.appendChild(subjectItem);
    });
}

function removeSubject(index) {
    subjects.splice(index, 1);
    renderSubjectsList();
}

function saveStudent() {
    const name = document.getElementById('adminStudentName').value.trim();
    const studentClass = document.getElementById('adminStudentClass').value;
    const session = document.getElementById('adminStudentSession').value;
    
    if (!name || !studentClass || !session || subjects.length === 0) {
        alert('Please fill all fields and add at least one subject');
        return;
    }
    
    // Generate PIN for the student
    const pin = generatePin();
    
    // In a real app, this would save to a database
    alert(`Student ${name} saved successfully!\nGenerated PIN: ${pin}`);
    
    // Reset form
    document.getElementById('adminStudentName').value = '';
    document.getElementById('adminStudentClass').value = '';
    document.getElementById('adminStudentSession').value = '';
    subjects = [];
    renderSubjectsList();
    
    // Refresh student list
    loadStudents();
}

// PDF download (stub function)
function downloadPDF() {
    alert('In a real application, this would generate and download a PDF of the result sheet.');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any modals
    const purchaseModal = document.getElementById('purchaseModal');
    if (purchaseModal) {
        purchaseModal.addEventListener('hidden.bs.modal', function () {
            document.getElementById('purchaseForm').style.display = 'block';
            document.getElementById('purchaseSuccess').style.display = 'none';
        });
    }
});