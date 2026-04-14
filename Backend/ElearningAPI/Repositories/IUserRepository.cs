using ElearningAPI.Models;

namespace ElearningAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetById(int id);
        Task Add(User user);
        Task Update(User user);
    }
}