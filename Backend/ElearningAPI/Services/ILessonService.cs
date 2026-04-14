using ElearningAPI.DTOs;

namespace ElearningAPI.Services
{
    public interface ILessonService
    {
        Task<IEnumerable<object>> GetLessons(int courseId);
        Task<object> AddLesson(LessonDto dto);
        Task<bool> UpdateLesson(int id, LessonDto dto);
        Task<bool> DeleteLesson(int id);
    }
}