using System.ComponentModel.DataAnnotations;

namespace ElearningAPI.DTOs
{
    public class CourseDto
    {
        public int CourseId { get; set; }   // 👈 ADD THIS

        [Required]
        public string Title { get; set; } = "";

        [Required]
        public string Description { get; set; } = "";

        [Required]
        public int CreatedBy { get; set; }

        public List<LessonDto>? Lessons { get; set; }
    }
}