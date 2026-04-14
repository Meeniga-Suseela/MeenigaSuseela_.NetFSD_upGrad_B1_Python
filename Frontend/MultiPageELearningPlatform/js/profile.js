// js/profile.js

document.addEventListener("DOMContentLoaded", async () => {

    // --- Initialize student info in localStorage if missing ---
    if (!localStorage.getItem("studentName")) localStorage.setItem("studentName", "Meeniga Suseela");
    if (!localStorage.getItem("studentEmail")) localStorage.setItem("studentEmail", "meenigasuseela@gmail.com");
    if (!localStorage.getItem("completedCourses")) localStorage.setItem("completedCourses", JSON.stringify([]));

    // --- Populate Student Info Form ---
    const nameInput = document.getElementById("studentNameInput");
    const emailInput = document.getElementById("studentEmailInput");
    
    const userId = localStorage.getItem("userId");

    const res = await fetch(`http://localhost:5199/api/users/${userId}`);
    const user = await res.json();

    nameInput.value = user.fullName;
    emailInput.value = user.email;

    const saveMessage = document.getElementById("saveMessage");

    document.getElementById("studentInfoForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const newName = nameInput.value.trim();
        const newEmail = emailInput.value.trim();

        if (newName && newEmail) {
            localStorage.setItem("studentName", newName);
            localStorage.setItem("studentEmail", newEmail);
            saveMessage.textContent = "Profile updated successfully!";
            saveMessage.style.color = "green";
        } else {
            saveMessage.textContent = "Please fill out both fields.";
            saveMessage.style.color = "red";
        }
    });

    loadCompletedCourses();


    // ✅ FETCH QUIZ RESULTS FROM BACKEND
    const resultRes = await fetch(`http://localhost:5199/api/results/${userId}`);
    const results = await resultRes.json();

    let percentage = 0;

    if (results.length > 0) {

        const latest = results[results.length - 1];

        // ✅ FETCH QUESTIONS COUNT
        const qRes = await fetch(`http://localhost:5199/api/quizzes/${latest.quizId}/questions`);
        const questions = await qRes.json();

        const totalQuestions = questions.length;

        percentage = totalQuestions > 0
            ? Math.round((latest.score / totalQuestions) * 100)
            : 0;
    }

    document.getElementById("profileQuizScore").textContent = percentage + "%";

    // --- Display Learning Progress ---
    const courseRes = await fetch("http://localhost:5199/api/courses");
    const courses = await courseRes.json();

    const totalCourses = courses.length;
    const completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");

    const progress = totalCourses > 0
        ? Math.round((completed.length / totalCourses) * 100)
        : 0;

    document.getElementById("profileProgress").value = progress;

    // --- Reset Profile Button ---
    const resetBtn = document.getElementById("resetProfileBtn");
    resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset your profile?")) {
            localStorage.clear();
            alert("All profile data cleared!");
            location.reload();
        }
    });
});

function loadCompletedCourses() {

        const completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");
        const completedList = document.getElementById("completedCoursesList");

        completedList.innerHTML = "";

        completed.forEach(course => {
            const li = document.createElement("li");
            li.textContent = course;
            completedList.appendChild(li);
        });
}

window.addEventListener("storage", () => {
    loadCompletedCourses();
});