using ElearningAPI.Models;

namespace ElearningAPI.Repositories
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAll();
        Task<Course?> GetById(int id);
        Task Add(Course course);
        Task Update(Course course);
        Task Delete(Course course);
    }
}