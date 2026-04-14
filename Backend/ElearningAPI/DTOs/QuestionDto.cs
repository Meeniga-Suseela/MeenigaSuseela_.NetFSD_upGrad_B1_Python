using System.ComponentModel.DataAnnotations;

namespace ElearningAPI.DTOs
{
    public class QuestionDto
    {
        [Required]
        public int QuizId { get; set; }

        [Required]
        [MaxLength(500)]
        public string QuestionText { get; set; } = "";

        [Required]
        public string OptionA { get; set; } = "";

        [Required]
        public string OptionB { get; set; } = "";

        [Required]
        public string OptionC { get; set; } = "";

        [Required]
        public string OptionD { get; set; } = "";

        [Required]
        [RegularExpression("A|B|C|D", ErrorMessage = "CorrectAnswer must be A, B, C or D")]
        public string CorrectAnswer { get; set; } = "";
    }
}