using ElearningAPI.Models;

namespace ElearningAPI.Repositories
{
    public interface IResultRepository
    {
        Task<IEnumerable<Result>> GetByUserId(int userId);
        Task Add(Result result);
    }
}