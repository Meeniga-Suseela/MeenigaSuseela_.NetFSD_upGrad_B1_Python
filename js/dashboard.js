// js/dashboard.js

document.addEventListener("DOMContentLoaded", () => {
    const studentName = localStorage.getItem("studentName") || "Student";
document.getElementById("welcomeMessage").textContent =
    "Welcome " + studentName + "!";

    const totalCourses = courses.length;
    const completed = getFromLocalStorage("completedCourses") || [];
    const score = getFromLocalStorage("quizScore") || 0;

    document.getElementById("totalCourses").textContent = totalCourses;
    document.getElementById("completedCourses").textContent = completed.length;
    document.getElementById("quizScore").textContent = score + "%";

    const progress = totalCourses > 0
    ? Math.round((completed.length / totalCourses) * 100)
    : 0;

    document.getElementById("progressBar").value = progress;

});
