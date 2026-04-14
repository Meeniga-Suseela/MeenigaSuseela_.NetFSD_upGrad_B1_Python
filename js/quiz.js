document.addEventListener("DOMContentLoaded", async () => {

    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("result");
    const progressBar = document.getElementById("quizProgress");
    const timerElement = document.getElementById("quizTimer");

    let timeLeft = localStorage.getItem("quizTimeLeft") || 60;

    // Escape HTML
    const escapeHTML = (text) => text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");

    const saveQuizProgress = () => {
        const answers = [];
        quizQuestions.forEach((q, i) => {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            answers.push(sel ? sel.value : "");
        });
        localStorage.setItem("quizProgress", JSON.stringify(answers));
    };

    const handleAnswerChange = () => {
    const total = quizQuestions.length;
    const answered = document.querySelectorAll('input[type="radio"]:checked').length;
    const percent = Math.round((answered / total) * 100);

    if (progressBar) {
        progressBar.style.width = percent + "%";
        progressBar.setAttribute("aria-valuenow", percent); // Update ARIA value
    }
};


    // Timer
    const timer = setInterval(() => {
        timeLeft--;
        localStorage.setItem("quizTimeLeft", timeLeft);
        timerElement.textContent = timeLeft;
        if (timeLeft <= 10) timerElement.classList.add("warning");
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time is up! Submitting quiz.");
            submitQuiz(true);
        }
    }, 1000);

    // Render quiz questions
    quizContainer.innerHTML = "<p>Loading quiz...</p>";
    await new Promise(r => setTimeout(r, 500));
    quizContainer.innerHTML = "";

    quizQuestions.forEach((q, i) => {
        const qDiv = document.createElement("div");
        qDiv.className = "quiz-question card p-3 mb-3 shadow-sm";

        const question = document.createElement("h5");
        question.innerHTML = `${i+1}. ${escapeHTML(q.question)}`;
        qDiv.appendChild(question);

        q.options.forEach(opt => {
            const label = document.createElement("label");
            label.className = "option-label p-2 mb-1 border rounded d-block";
            label.innerHTML = `<input type="radio" name="q${i}" value="${escapeHTML(opt)}" class="me-2"> ${escapeHTML(opt)}`;
            const radio = label.querySelector("input");
            radio.addEventListener("change", () => {
                handleAnswerChange();
                saveQuizProgress();
                document.querySelectorAll(`input[name="q${i}"]`).forEach(r=>r.parentElement.classList.remove("bg-info","text-white"));
                label.classList.add("bg-info","text-white");
            });
            qDiv.appendChild(label);
        });

        quizContainer.appendChild(qDiv);
    });

    // Load saved answers
    const loadSavedAnswers = () => {
        const saved = JSON.parse(localStorage.getItem("quizProgress")) || [];
        saved.forEach((ans, i) => {
            if (ans) {
                const radio = document.querySelector(`input[name="q${i}"][value="${ans}"]`);
                if (radio) {
                    radio.checked = true;
                    radio.parentElement.classList.add("bg-info","text-white");
                }
            }
        });
        handleAnswerChange();
    };
    loadSavedAnswers();

    // Submit quiz
    window.submitQuiz = function(auto=false) {
        clearInterval(timer);
        const userAnswers = quizQuestions.map((q,i)=> {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            return sel ? sel.value : "";
        });
        if (!auto && userAnswers.includes("")) {
            alert("Please answer all questions before submitting.");
            return;
        }

        const percentage = calculateScore(quizQuestions, userAnswers);

        let completed = getFromLocalStorage("completedCourses") || [];
        const courseName = "JavaScript Basics";
        if (!completed.includes(courseName)) completed.push(courseName);
        saveToLocalStorage("completedCourses", completed);
        saveToLocalStorage("quizScore", percentage);

        // Highlight answers
        quizQuestions.forEach((q,i)=>{
            document.getElementsByName(`q${i}`).forEach(opt=>{
                const label = opt.parentElement;
                label.classList.remove("bg-success","bg-danger","text-white");
                if(opt.value === q.answer) label.classList.add("bg-success","text-white");
                else if(opt.checked && opt.value !== q.answer) label.classList.add("bg-danger","text-white");
                opt.disabled = true;
            });
        });

        const grade = calculateGrade(percentage);
        resultContainer.innerHTML = `<h4>Your Score: ${percentage}%</h4><h5>Grade: ${grade}</h5><p>${getPerformanceMessage(percentage)}</p>`;
        if(percentage >= 60) document.getElementById("certificateSection").style.display="block";

        document.getElementById("submitQuizBtn").disabled=true;
        document.getElementById("submitQuizBtn").textContent="Quiz Submitted";

        localStorage.removeItem("quizProgress");
        localStorage.removeItem("quizTimeLeft");
    };
    

    // Resume / Start Fresh
    window.resumeQuiz = () => { loadSavedAnswers(); bootstrap.Modal.getInstance(document.getElementById("resumeModal")).hide(); };
    window.startFresh = () => { localStorage.removeItem("quizProgress"); localStorage.removeItem("quizTimeLeft"); location.reload(); };

});
function generateCertificate() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4"
    });

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // Background color
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, width, height, "F");

    // Border
    doc.setLineWidth(4);
    doc.setDrawColor(0, 102, 204); // blue border
    doc.rect(20, 20, width - 40, height - 40);

    // Certificate title
    doc.setFontSize(40);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text("Certificate of Completion", width / 2, 120, { align: "center" });

    // Student name
    const studentName = prompt("Enter your name for the certificate:", "Student Name");

    doc.setFontSize(28);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("This is to certify that", width / 2, 200, { align: "center" });

    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.text(`${studentName}`, width / 2, 260, { align: "center" });

    // Course name
    doc.setFontSize(28);
    doc.setFont("helvetica", "normal");
    doc.text("has successfully completed the course", width / 2, 320, { align: "center" });

    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text("JavaScript Basics", width / 2, 370, { align: "center" });

    // Date
    const today = new Date();
    const dateStr = today.toLocaleDateString();
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${dateStr}`, 60, height - 100);

    // Signature line
    doc.setLineWidth(1);
    doc.line(width - 200, height - 110, width - 60, height - 110); // line
    doc.setFontSize(16);
    doc.text("Instructor Signature", width - 130, height - 90, { align: "center" });

    // Footer
    doc.setFontSize(14);
    doc.text("© 2026 Learning Platform", width / 2, height - 40, { align: "center" });

    // Download the PDF
    doc.save(`${studentName}_Certificate.pdf`);
}
