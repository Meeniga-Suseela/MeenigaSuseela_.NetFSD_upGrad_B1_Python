using ElearningAPI.Models;

namespace ElearningAPI.Repositories
{
    public interface ILessonRepository
    {
        Task<IEnumerable<Lesson>> GetByCourseId(int courseId);
        Task Add(Lesson lesson);
        Task Update(Lesson lesson);
        Task Delete(Lesson lesson);
        Task<Lesson?> GetById(int id);
    }
}