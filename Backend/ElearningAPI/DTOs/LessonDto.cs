using System.ComponentModel.DataAnnotations;

namespace ElearningAPI.DTOs
{
    public class LessonDto
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = "";

        [Required]
        public string Content { get; set; } = "";

        [Range(1, 100)]
        public int OrderIndex { get; set; }
    }
}