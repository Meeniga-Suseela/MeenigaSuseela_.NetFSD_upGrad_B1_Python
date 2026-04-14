
# 📚 MultiPage E-Learning Platform (Full Stack)

## 📌 Project Overview

The **E-Learning Platform** is a full-stack Learning Management System (LMS) developed using:

- 🎨 **Frontend**: HTML, CSS, Bootstrap, JavaScript  
- ⚙️ **Backend**: ASP.NET Core 8 Web API (C#)  
- 🗄️ **Database**: SQL Server  

Initially built as a frontend-only application, the platform was enhanced into a **full-stack system** with REST APIs, database integration, and real-time data handling.

It allows users to:
- Explore courses  
- Learn lessons  
- Attempt quizzes  
- Track progress  
- View performance  
- Download certificates  
=======
# 📚 Multi-Page E-Learning Platform

## 📌 Project Overview

The **Multi-Page E-Learning Platform** is a simple Learning Management System (LMS) developed using **HTML, CSS, JavaScript, and Bootstrap**.  
It allows users to explore courses, attempt quizzes, track their progress, and download a certificate after successfully completing the quiz.

The platform demonstrates **multi-page navigation, dynamic content rendering, and data persistence using LocalStorage**.

---

## 🚀 Features

### 🌐 Frontend Features
- Multi-page navigation (Login, Dashboard, Courses, Quiz, Profile)  
- Interactive quiz system with multiple-choice questions  
- Quiz timer with auto submission  
- Quiz progress bar  
- Score calculation and grading  
- Certificate generation  
- Responsive design using Bootstrap  
- LocalStorage for session management  

---

### ⚙️ Backend Features
- RESTful API development  
- Course, Lesson, Quiz, User & Result management  
- Dynamic quiz evaluation using QuestionId mapping  
- Score calculation and percentage evaluation  
- SQL Server database integration  
- Entity Framework Core (ORM)  
- DTO-based architecture  
- AutoMapper integration  
- Input validation using ModelState  
- Proper HTTP status codes  
=======
* Multi-page navigation (Dashboard, Courses, Quiz, Profile)
* Interactive quiz system with multiple-choice questions
* Quiz timer with automatic submission
* Quiz progress bar showing completion percentage
* Score calculation and grading system
* Certificate generation after passing the quiz
* Student profile management
* Data persistence using LocalStorage
* Responsive design using Bootstrap

---

## 🛠 Technologies Used

### 🎨 Frontend
- HTML5  
- CSS3  
- JavaScript (ES6)  
- Bootstrap 5  

### ⚙️ Backend
- ASP.NET Core 8 Web API  
- C#  
- Entity Framework Core  
- AutoMapper  

### 🗄️ Database
- SQL Server  

### 🧪 Testing
- Jest (Frontend)  
- xUnit (Backend)  
=======
* **HTML5**
* **CSS3**
* **JavaScript (ES6)**
* **Bootstrap 5**
* **LocalStorage API**
* **Jest** (for testing quiz functionality)

---

## 📂 Project Structure

```plaintext
ELearningProject/
 ├── Frontend/
 │    └── MultiPageElearningPlatform/
 │         ├── login.html
 │         ├── dashboard.html
 │         ├── courses.html
 │         ├── quiz.html
 │         ├── profile.html
 │         │
 │         ├── css/
 │         │    └── styles.css
 │         │
 │         ├── js/
 │         │    ├── data.js
 │         │    ├── utils.js
 │         │    ├── dashboard.js
 │         │    ├── courses.js      # Course logic
 │         │    ├── quiz.js         # Quiz logic
 │         │    └── profile.js
 │         │
 │         ├── tests/
 │         │    └── quiz.test.js
 │     
 │   
 │
 ├── Backend/
 │    └── ElearningAPI/
 │         ├── Controllers/        # API endpoints
 │         ├── Models/             # Database entities
 │         ├── DTOs/               # Data Transfer Objects
 │         ├── Data/               # DbContext
 │         ├── Repositories/       # Data access layer
 │         ├── Profiles/           # AutoMapper mappings
 │         ├── Migrations/         # Database migrations
 │         ├── ElearningAPI.Tests/ # Unit tests
 │         ├── Program.cs          # Entry point
 │         └── ElearningAPI.csproj
 │
 └── README.md

 🔐 Authentication
login.html → Handles user registration/login
Stores userId and session in LocalStorage
Used across dashboard, quiz, and profile
📂 JavaScript Modules
dashboard.js → Displays course summary & progress
courses.js → Handles course listing and navigation
quiz.js → Manages quiz questions, timer, submission
profile.js → Displays user profile and results
utils.js → Helper functions
data.js → Static/mock data (frontend phase)
🔗 API Endpoints
📘 Courses
GET     /api/courses
GET     /api/courses/{id}
POST    /api/courses
PUT     /api/courses/{id}
DELETE  /api/courses/{id}
📖 Lessons
GET     /api/courses/{courseId}/lessons
POST    /api/lessons
PUT     /api/lessons/{id}
DELETE  /api/lessons/{id}
📝 Quiz
GET     /api/quizzes/{courseId}
POST    /api/quizzes
GET     /api/quizzes/{quizId}/questions
POST    /api/questions
📊 QuizAttempt
POST    /api/results/quizzes/{quizId}/submit
GET     /api/results/{userId}
👤 Users
POST    /api/users/register
GET     /api/users/by-email
GET     /api/users/{id}
PUT     /api/users/{id}

▶️ How to Run the Project

🔹 Backend

cd Backend/ElearningAPI
dotnet run

Runs on: http://localhost:5199

🔹 Frontend

Open:

Frontend/MultiPageElearningPlatform/dashboard.html

🧪 Testing
Frontend
npm install
npm test

Backend
dotnet test

🎯 Key Functionalities
Dynamic quiz generation
Backend-based scoring system
Latest result retrieval
Course completion tracking
Real-time frontend-backend integration
📊 Learning Outcomes

This project demonstrates:

Full-stack web development
REST API design
Database relationships
DOM manipulation
State management
Async programming (async/await)
Secure password handling
Unit testing (Jest + xUnit)

🏆 Highlights

✔ Clean architecture (DTO + Repository + API layers)
✔ Scalable design
✔ Real-time data interaction
✔ Industry-level project

👩‍💻 Developed By

Meeniga Suseela

📅 Year

=======
E-Learning-Platform
│
├── dashboard.html
├── courses.html
├── quiz.html
├── profile.html
│
├── css
│ └── styles.css
│
├── js
│ ├── data.js
│ ├── utils.js
│ ├── dashboard.js
│ ├── quiz.js
│ └── profile.js
│
├── tests
│ └── quiz.test.js
│
├── README.md
└── .gitignore


---

## ▶️ How to Run the Project

1. Download or clone the repository.
2. Open the project folder.
3. Open **dashboard.html** in any modern web browser.

No backend or server setup is required.

---

## 🧪 Testing

* The `tests` folder contains Jest test cases for the quiz functionality (`quiz.test.js`).
* To run tests:
```bash
npm install
npm test

🎯 Learning Outcomes
This project demonstrates:

    1. Multi-page web application structure

    2. DOM manipulation

    3. Event handling in JavaScript

    4. Dynamic content rendering

    5. LocalStorage data persistence

    6. Responsive UI design

    7. Unit testing with Jest

👩‍💻 Developed By
Meeniga Suseela

📅 Year
2026