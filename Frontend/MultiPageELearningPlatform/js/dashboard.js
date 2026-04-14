document.addEventListener("DOMContentLoaded", async () => {

    const studentName = localStorage.getItem("studentName") || "Student";
    const userId = localStorage.getItem("userId");

    document.getElementById("welcomeMessage").textContent =
        "Welcome " + studentName + "!";

    // ✅ FETCH COURSES
    const courseRes = await fetch("http://localhost:5199/api/courses");
    const courses = await courseRes.json();

    const totalCourses = courses.length;

    // ✅ COMPLETED COURSES (still local)
    const completed = getFromLocalStorage("completedCourses") || [];

    document.getElementById("totalCourses").textContent = totalCourses;
    document.getElementById("completedCourses").textContent = completed.length;

    // ✅ FETCH QUIZ RESULTS FROM BACKEND
    const resultRes = await fetch(`http://localhost:5199/api/results/${userId}`);
    const results = await resultRes.json();

    // 🎯 CALCULATE SCORE %
    let percentage = 0;

        if (results.length > 0) {

            const latest = results[results.length - 1];

            // ✅ FETCH QUESTIONS FOR THAT QUIZ
            const qRes = await fetch(`http://localhost:5199/api/quizzes/${latest.quizId}/questions`);
            const questions = await qRes.json();

            const totalQuestions = questions.length;

            percentage = totalQuestions > 0
                ? Math.round((latest.score / totalQuestions) * 100)
                : 0;
        }

    document.getElementById("quizScore").textContent = percentage + "%";

    // 🎯 PROGRESS BAR
    const progress = totalCourses > 0
        ? Math.round((completed.length / totalCourses) * 100)
        : 0;

    document.getElementById("progressBar").value = progress;

});