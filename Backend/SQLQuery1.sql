-- ================================
-- USE DATABASE
-- ================================
USE ElearningDB;
GO

-- ================================
-- INSERT SAMPLE DATA
-- ================================

INSERT INTO Users (FullName, Email, PasswordHash, CreatedAt)
VALUES 
('Vijay', 'vijay@mail.com', 'hash1', GETDATE()),
('Ravi', 'ravi@mail.com', 'hash2', GETDATE());

INSERT INTO Courses (Title, Description, CreatedBy, CreatedAt)
VALUES 
('C# Basics', 'Learn C#', 1, GETDATE()),
('ASP.NET Core', 'Web Development', 1, GETDATE());

INSERT INTO Lessons (CourseId, Title, Content, OrderIndex)
VALUES 
(1, 'Intro to C#', 'Basics of C#', 1),
(1, 'Variables', 'Data types', 2);

INSERT INTO Quizzes (CourseId, Title)
VALUES 
(1, 'C# Quiz');

INSERT INTO Questions (QuizId, QuestionText, OptionA, OptionB, OptionC, OptionD, CorrectAnswer)
VALUES 
(1, 'What is C#?', 'Language', 'OS', 'Browser', 'Database', 'A'),
(1, 'Keyword for class?', 'class', 'struct', 'void', 'int', 'A');

INSERT INTO Results (UserId, QuizId, Score, AttemptDate)
VALUES 
(1, 1, 2, GETDATE()),
(2, 1, 1, GETDATE());

-- ================================
-- BASIC QUERIES
-- ================================

SELECT * FROM Users;
SELECT * FROM Courses;

SELECT * FROM Courses WHERE CreatedBy = 1;

SELECT * FROM Courses ORDER BY CreatedAt DESC;

-- ================================
-- JOINS
-- ================================

SELECT u.FullName, c.Title
FROM Users u
INNER JOIN Courses c ON u.UserId = c.CreatedBy;

SELECT u.FullName, r.Score
FROM Users u
LEFT JOIN Results r ON u.UserId = r.UserId;

-- ================================
-- AGGREGATION
-- ================================

SELECT UserId, COUNT(*) AS TotalAttempts
FROM Results
GROUP BY UserId;

SELECT UserId, AVG(Score) AS AverageScore
FROM Results
GROUP BY UserId;

-- ================================
-- SUBQUERY
-- ================================

SELECT * FROM Results
WHERE Score > (SELECT AVG(Score) FROM Results);

-- ================================
-- UNION
-- ================================

SELECT FullName FROM Users
UNION
SELECT Title FROM Courses;

-- ================================
-- DML
-- ================================

INSERT INTO Users (FullName, Email, PasswordHash, CreatedAt)
VALUES ('TestUser', 'test@mail.com', 'hash', GETDATE());

UPDATE Courses
SET Title = 'Updated Course'
WHERE CourseId = 1;

DELETE FROM Lessons
WHERE LessonId = 2;

-- ================================

SELECT c.Title, l.Title AS Lesson
FROM Courses c
INNER JOIN Lessons l ON c.CourseId = l.CourseId;

SELECT q.Title, qs.QuestionText
FROM Quizzes q
INNER JOIN Questions qs ON q.QuizId = qs.QuizId;

SELECT u.FullName, q.Title, r.Score
FROM Results r
INNER JOIN Users u ON r.UserId = u.UserId
INNER JOIN Quizzes q ON r.QuizId = q.QuizId;