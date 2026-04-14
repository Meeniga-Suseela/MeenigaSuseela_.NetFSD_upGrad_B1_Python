using System;
using System.Collections.Generic;

namespace ElearningAPI.Models
{
    public class Course
    {
        public int CourseId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public User? User { get; set; }

        public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();

        public ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
    }
}