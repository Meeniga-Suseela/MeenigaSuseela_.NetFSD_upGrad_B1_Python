namespace ElearningAPI.Services
{
    public interface IResultService
    {
        Task<IEnumerable<object>> GetResults(int userId);
    }
}