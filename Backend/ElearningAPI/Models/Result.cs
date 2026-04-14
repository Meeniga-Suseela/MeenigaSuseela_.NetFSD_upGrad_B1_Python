using System;

namespace ElearningAPI.Models
{
    public class Result
    {
        public int ResultId { get; set; }

        public int UserId { get; set; }

        public int QuizId { get; set; }

        public int Score { get; set; }

        public DateTime AttemptDate { get; set; }

        // Navigation Property
        public User? User { get; set; }
    }
}