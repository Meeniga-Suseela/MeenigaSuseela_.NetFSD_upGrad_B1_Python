using System.ComponentModel.DataAnnotations;

namespace ElearningAPI.DTOs
{
    public class QuizDto
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = "";
    }
}