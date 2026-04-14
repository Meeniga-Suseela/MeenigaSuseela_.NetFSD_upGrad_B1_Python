using System.ComponentModel.DataAnnotations;

namespace ElearningAPI.DTOs
{

    public class AnswerDto
    {
        public int QuestionId { get; set; }
        public string Answer { get; set; } = "";
    }

    public class QuizSubmitDto
    {
        [Required]
        public int QuizId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one answer is required")]
        public List<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
    }
}