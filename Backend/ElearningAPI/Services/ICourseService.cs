using ElearningAPI.DTOs;

namespace ElearningAPI.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetAllCourses();
        Task<CourseDto?> GetCourseById(int id);
        Task<CourseDto> CreateCourse(CourseDto dto);
        Task<bool> UpdateCourse(int id, CourseDto dto);
        Task<bool> DeleteCourse(int id);
    }
}