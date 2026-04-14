using System.Collections.Generic;

namespace ElearningAPI.Models
{
    public class Quiz
    {
        public int QuizId { get; set; }

        public int CourseId { get; set; }

        public string Title { get; set; } = string.Empty;

        // Navigation Properties
        public ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}