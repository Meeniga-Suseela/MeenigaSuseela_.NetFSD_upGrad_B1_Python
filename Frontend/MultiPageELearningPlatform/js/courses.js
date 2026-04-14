document.addEventListener("DOMContentLoaded", () => {

    const courseCardsContainer = document.getElementById("courseCards");
    const coursesTableBody = document.getElementById("coursesTableBody");

    async function getCoursesFromAPI() {
        const res = await fetch("http://localhost:5199/api/courses");
        return await res.json();
    }

    async function renderCourseTable() {
        const courses = await getCoursesFromAPI();

        coursesTableBody.innerHTML = "";
        courses.forEach((course, idx) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idx+1}</td>
                <td>${course.title}</td>
                <td>
                    <ol>
                        ${course.lessons?.map(l => `<li>${l.title}</li>`).join("")}
                    </ol>
                </td>
            `;
            coursesTableBody.appendChild(row);
        });
    }

    async function renderCourseCards() {
        const courses = await getCoursesFromAPI();
        const completed = getFromLocalStorage("completedCourses") || [];

        courseCardsContainer.innerHTML = "";

        courses.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");

            card.innerHTML = `
    <h4>${course.title}</h4>
    <p>Total Lessons: ${course.lessons?.length || 0}</p>
    <p>Completed: ${completed.includes(course.title) ? "Yes ✅" : "No ❌"}</p>

    <button class="btn btn-primary mb-2" onclick="markComplete('${course.title}')">
        Mark Complete
    </button>

    <button class="btn btn-success" onclick="openQuiz(${course.courseId}, '${course.title}')">
        Start Quiz
    </button>
`;
            courseCardsContainer.appendChild(card);
        });
    }

    window.markComplete = function(courseTitle) {
        let completed = getFromLocalStorage("completedCourses") || [];

        if (completed.includes(courseTitle)) {
            completed = completed.filter(c => c !== courseTitle);
            alert(`${courseTitle} marked as not completed.`);
        } else {
            completed.push(courseTitle);
            alert(`${courseTitle} marked as completed!`);
        }

        saveToLocalStorage("completedCourses", completed);
        renderCourseCards();
    }

    window.openQuiz = function(courseId, courseTitle) {

    // ✅ Store course name
        localStorage.setItem("courseName", courseTitle);

    // 👉 Navigate
        localStorage.setItem("courseName", courseTitle);
        window.location.href = `quiz.html?courseId=${courseId}`;
    };

    renderCourseTable();
    renderCourseCards();
});