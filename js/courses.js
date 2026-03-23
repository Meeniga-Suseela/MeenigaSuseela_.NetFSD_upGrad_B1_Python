document.addEventListener("DOMContentLoaded", () => {
    const courseCardsContainer = document.getElementById("courseCards");
    const coursesTableBody = document.getElementById("coursesTableBody");

    function renderCourseTable() {
        coursesTableBody.innerHTML = "";
        courses.forEach((course, idx) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idx+1}</td>
                <td>${course.title}</td>
                <td><ol>${course.lessons.map(l=>`<li>${l}</li>`).join("")}</ol></td>
            `;
            coursesTableBody.appendChild(row);
        });
    }

    function renderCourseCards() {
        const completed = getFromLocalStorage("completedCourses") || [];
        courseCardsContainer.innerHTML = "";

        courses.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            card.innerHTML = `
                <h4>${course.title}</h4>
                <p>Total Lessons: ${course.lessons.length}</p>
                <p>Completed: ${completed.includes(course.title) ? "Yes ✅" : "No ❌"}</p>
                <button class="btn btn-primary" onclick="markComplete('${course.title}')">Mark Complete</button>
            `;
            courseCardsContainer.appendChild(card);
        });
    }

    // --- Existing code in courses.js ---
window.markComplete = function(courseTitle) {
    let completed = getFromLocalStorage("completedCourses") || [];
    
    if (completed.includes(courseTitle)) {
        // ✅ Course is already completed, remove it
        completed = completed.filter(c => c !== courseTitle);
        alert(`${courseTitle} marked as not completed.`);
    } else {
        // ✅ Mark course as completed
        completed.push(courseTitle);
        alert(`${courseTitle} marked as completed!`);
    }

    saveToLocalStorage("completedCourses", completed);
    renderCourseCards();
}
// --- End of updated function ---

    renderCourseTable();
    renderCourseCards();
});
