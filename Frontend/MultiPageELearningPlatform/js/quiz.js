document.addEventListener("DOMContentLoaded", async () => {

    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("result");
    const progressBar = document.getElementById("quizProgress");
    const timerElement = document.getElementById("quizTimer");

    let timeLeft = localStorage.getItem("quizTimeLeft") || 60;

    let quizQuestions = [];
    let quizId = 0;

    // ✅ GET courseId FROM URL
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("courseId");

    const escapeHTML = (text) =>
        text.replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;");

    // 🟢 FETCH QUIZ + QUESTIONS
    quizContainer.innerHTML = "<p>Loading quiz...</p>";

    // Step 1: Get quiz by course
    const quizRes = await fetch(`http://localhost:5199/api/quizzes/${courseId}`);
    const quizData = await quizRes.json();

    if (!quizData || quizData.length === 0) {
    quizContainer.innerHTML = "<p>No quiz available for this course.</p>";
    return;
}
    quizId = quizData[0].quizId;

    // Step 2: Get questions
    const res = await fetch(`http://localhost:5199/api/quizzes/${quizId}/questions`);
    const questions = await res.json();

    quizQuestions = questions.map(q => ({
    questionId: Number(q.questionId),
    questionText: q.questionText,
    optionA: q.optionA,
    optionB: q.optionB,
    optionC: q.optionC,
    optionD: q.optionD,
    correctAnswer: q.correctAnswer
    }));
    quizContainer.innerHTML = "";

    // SAVE PROGRESS
    const saveQuizProgress = () => {
        const answers = [];
        quizQuestions.forEach((q, i) => {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            answers.push(sel ? sel.value : "");
        });
        localStorage.setItem("quizProgress", JSON.stringify(answers));
    };

    // PROGRESS BAR
    const handleAnswerChange = () => {
        const total = quizQuestions.length;
        const answered = document.querySelectorAll('input[type="radio"]:checked').length;
        const percent = Math.round((answered / total) * 100);

        if (progressBar) {
            progressBar.style.width = percent + "%";
        }
    };

    // TIMER
    const timer = setInterval(() => {
        timeLeft--;
        localStorage.setItem("quizTimeLeft", timeLeft);
        timerElement.textContent = timeLeft;

        if (timeLeft <= 10) timerElement.classList.add("warning");

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time is up!");
            submitQuiz(true);
        }
    }, 1000);

    // RENDER QUESTIONS
    quizQuestions.forEach((q, i) => {

        const qDiv = document.createElement("div");
        qDiv.className = "quiz-question card p-3 mb-3 shadow-sm";

        const question = document.createElement("h5");
        question.innerHTML = `${i+1}. ${escapeHTML(q.questionText)}`;
        qDiv.appendChild(question);

        const options = [q.optionA, q.optionB, q.optionC, q.optionD];

        options.forEach((opt, index) => {

    const label = document.createElement("label");
    label.className = "option-label p-2 mb-1 border rounded d-block";

    const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

    label.innerHTML = `
        <input type="radio" name="q${i}" value="${optionLetter}" class="me-2">
        ${opt}
    `;

    const radio = label.querySelector("input");

    radio.addEventListener("change", () => {
        handleAnswerChange();
        saveQuizProgress();

        document.querySelectorAll(`input[name="q${i}"]`)
            .forEach(r => r.parentElement.classList.remove("bg-info","text-white"));

        label.classList.add("bg-info","text-white");
    });

    qDiv.appendChild(label);
});

        quizContainer.appendChild(qDiv);
    });

    // LOAD SAVED ANSWERS
    const saved = JSON.parse(localStorage.getItem("quizProgress")) || [];

    saved.forEach((ans, i) => {
        const radio = document.querySelector(`input[name="q${i}"][value="${ans}"]`);
        if (radio) {
            radio.checked = true;
            radio.parentElement.classList.add("bg-info","text-white");
        }
    });

    handleAnswerChange();

    // SUBMIT QUIZ
    window.submitQuiz = async function(auto=false) {

        clearInterval(timer);

        const userId = Number(localStorage.getItem("userId"));

    if (!userId || userId === 0) {
        alert("User not logged in. Please login first!");
        window.location.href = "login.html";
        return;
    }
        const userAnswers = quizQuestions.map((q,i)=> {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            return sel ? sel.value : "";
        });

        if (!auto && userAnswers.includes("")) {
            alert("Please answer all questions");
            return;
        }

        console.log("UserId being sent:", localStorage.getItem("userId"));
        const res = await fetch(`http://localhost:5199/api/results/quizzes/${quizId}/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quizId: quizId,
                userId: userId,
                answers: quizQuestions.map((q, i) => ({
                questionId: Number(q.questionId),
                answer: userAnswers[i]
                }))
            })
        });

        let data;

        try {
            data = await res.json();
        } catch {
            const text = await res.text();
            console.error("Server error:", text);
            alert("Server error");
            return;
        }

        console.log("API RESPONSE:", data); // 🔍 DEBUG
        //alert(JSON.stringify(data));

        const score = Number(data.score || 0);

        const percentage = quizQuestions.length > 0
        ? Math.round((score / quizQuestions.length) * 100)
        : 0;

        quizQuestions.forEach((q,i)=>{
            document.getElementsByName(`q${i}`).forEach(opt=>{
                const label = opt.parentElement;

                label.classList.remove("bg-success","bg-danger","text-white");

                if(opt.value === q.correctAnswer)
                    label.classList.add("bg-success","text-white");
                else if(opt.checked && opt.value !== q.correctAnswer)
                    label.classList.add("bg-danger","text-white");

                opt.disabled = true;
            });
        });

        const grade = calculateGrade(percentage);

        resultContainer.innerHTML = `
            <h4>Your Score: ${percentage}%</h4>
            <h5>Grade: ${grade}</h5>
            <p>${getPerformanceMessage(percentage)}</p>
        `;

        if (percentage >= 60) {
            document.getElementById("certificateSection").classList.remove("hidden");
        }

        document.getElementById("submitQuizBtn").disabled = true;
        document.getElementById("submitQuizBtn").textContent = "Quiz Submitted";

        localStorage.removeItem("quizProgress");
        localStorage.removeItem("quizTimeLeft");
    };
    // Resume / Start Fresh
    window.resumeQuiz = () => { loadSavedAnswers(); bootstrap.Modal.getInstance(document.getElementById("resumeModal")).hide(); };
    window.startFresh = () => { localStorage.removeItem("quizProgress"); localStorage.removeItem("quizTimeLeft"); location.reload(); };

});


// 🟢 CERTIFICATE FUNCTION (KEEP THIS)
function generateCertificate() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4"
    });

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // 🎨 Border
    doc.setLineWidth(4);
    doc.rect(20, 20, width - 40, height - 40);

    // 🎓 Title
    doc.setFontSize(40);
    doc.setTextColor(40, 40, 40);
    doc.text("Certificate of Completion", width / 2, 120, { align: "center" });

    // 👤 Student Name
    const studentName = localStorage.getItem("studentName") || "Student";

    doc.setFontSize(30);
    doc.setTextColor(0, 102, 204);
    doc.text(studentName, width / 2, 220, { align: "center" });

    // 📘 Message
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("has successfully completed the course", width / 2, 270, { align: "center" });

    // 📚 Course Name (Dynamic)
    const courseName = localStorage.getItem("courseName") || "JavaScript Basics";

    doc.setFontSize(26);
    doc.setTextColor(0, 153, 76);
    doc.text(courseName, width / 2, 320, { align: "center" });

    // 📅 Date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text(`Date: ${date}`, width - 150, height - 60);

    // ✍️ Signature
    doc.setFontSize(16);
    doc.text("_______________________", 100, height - 80);
    doc.text("Instructor Signature", 110, height - 60);

    // 🏫 Footer
    doc.setFontSize(12);
    doc.text("E-Learning Platform", width / 2, height - 40, { align: "center" });

    // 💾 Save
    doc.save("Certificate.pdf");
}