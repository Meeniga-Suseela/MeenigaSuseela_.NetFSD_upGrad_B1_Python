using System.ComponentModel.DataAnnotations;

namespace ElearningAPI.DTOs
{
    public class ResultDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int QuizId { get; set; }

        [Required]
        [Range(0, 100, ErrorMessage = "Score must be between 0 and 100")]
        public int Score { get; set; }
    }
}