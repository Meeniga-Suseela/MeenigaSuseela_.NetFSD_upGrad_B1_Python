using ElearningAPI.DTOs;

namespace ElearningAPI.Services
{
    public interface IUserService
    {
        Task<object> Register(UserDto dto);
        Task<object?> GetUser(int id);
        Task<bool> UpdateUser(int id, UserDto dto);
    }
}