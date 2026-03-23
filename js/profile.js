// js/profile.js

document.addEventListener("DOMContentLoaded", () => {

    // --- Initialize student info in localStorage if missing ---
    if (!localStorage.getItem("studentName")) localStorage.setItem("studentName", "Meeniga Suseela");
    if (!localStorage.getItem("studentEmail")) localStorage.setItem("studentEmail", "meenigasuseela@gmail.com");
    if (!localStorage.getItem("completedCourses")) localStorage.setItem("completedCourses", JSON.stringify([]));
    if (!localStorage.getItem("quizScore")) localStorage.setItem("quizScore", "0");
    if (!localStorage.getItem("allCourses")) localStorage.setItem("allCourses", JSON.stringify(["Course 1", "Course 2", "Course 3"]));

    // --- Populate Student Info Form ---
    const nameInput = document.getElementById("studentNameInput");
    const emailInput = document.getElementById("studentEmailInput");
    nameInput.value = localStorage.getItem("studentName");
    emailInput.value = localStorage.getItem("studentEmail");

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

    // --- Display Completed Courses ---
    const completed = JSON.parse(localStorage.getItem("completedCourses") || "[]");
    const completedList = document.getElementById("completedCoursesList");
    completedList.innerHTML = "";
    completed.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course;
        completedList.appendChild(li);
    });

    // --- Display Quiz Score ---
    const score = JSON.parse(localStorage.getItem("quizScore") || "0");
    document.getElementById("profileQuizScore").textContent = score + "%";

    // --- Display Learning Progress ---
    const allCourses = JSON.parse(localStorage.getItem("allCourses") || "[]");
    const progress = allCourses.length > 0 ? Math.round((completed.length / allCourses.length) * 100) : 0;
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