// js/profile.js

document.addEventListener("DOMContentLoaded", () => {
    // --- Initialize student info if not already in localStorage ---
    if (!localStorage.getItem("studentName")) {
        localStorage.setItem("studentName", "Meeniga Suseela");
    }
    if (!localStorage.getItem("studentEmail")) {
        localStorage.setItem("studentEmail", "meenigasuseela@gmail.com");
    }

    // Get student info from localStorage
    let studentName = localStorage.getItem("studentName");
    let studentEmail = localStorage.getItem("studentEmail");

    // --- Student Information Section ---
    const studentInfoSection = document.querySelector("section.card:nth-of-type(1)");
    studentInfoSection.innerHTML = `
        <h3>Student Information</h3>
        <form id="studentInfoForm">
            <div class="mb-3">
                <label for="studentNameInput" class="form-label"><strong>Name:</strong></label>
                <input type="text" class="form-control" id="studentNameInput" value="${studentName}">
            </div>
            <div class="mb-3">
                <label for="studentEmailInput" class="form-label"><strong>Email:</strong></label>
                <input type="email" class="form-control" id="studentEmailInput" value="${studentEmail}">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <div id="saveMessage" class="mt-2 text-success"></div>
    `;

    // Handle form submission
    const form = document.getElementById("studentInfoForm");
    const saveMessage = document.getElementById("saveMessage");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newName = document.getElementById("studentNameInput").value.trim();
        const newEmail = document.getElementById("studentEmailInput").value.trim();

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

    // --- Completed Courses Section ---
    const completed = getFromLocalStorage("completedCourses") || [];
    const list = document.getElementById("completedCoursesList");
    list.innerHTML = "";
    completed.forEach(course => {
        const li = document.createElement("li");
        li.textContent = course;
        list.appendChild(li);
    });

    // --- Quiz Score ---
    const score = getFromLocalStorage("quizScore") || 0;
    document.getElementById("profileQuizScore").textContent = score + "%";

    // --- Learning Progress ---
    const progress = courses.length > 0 ? Math.round((completed.length / courses.length) * 100) : 0;
    document.getElementById("profileProgress").value = progress;

    // --- Reset Profile Button (only once) ---
    if (!document.getElementById("resetProfileBtn")) {
        const resetSection = document.createElement("section");
        resetSection.classList.add("card", "p-4", "mt-4", "text-center");
        resetSection.innerHTML = `<button id="resetProfileBtn" class="btn btn-danger">Reset Profile</button>`;
        studentInfoSection.parentElement.appendChild(resetSection);

        const resetBtn = document.getElementById("resetProfileBtn");
        resetBtn.addEventListener("click", () => {
            // Clear all relevant localStorage
            localStorage.removeItem("studentName");
            localStorage.removeItem("studentEmail");
            localStorage.removeItem("completedCourses");
            localStorage.removeItem("quizScore");

            alert("Profile has been reset!");
            location.reload();
        });
    }
});
