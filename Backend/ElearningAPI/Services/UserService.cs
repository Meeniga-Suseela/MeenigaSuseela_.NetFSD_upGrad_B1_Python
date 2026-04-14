using ElearningAPI.DTOs;
using ElearningAPI.Models;
using ElearningAPI.Repositories;
using AutoMapper;

namespace ElearningAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<object> Register(UserDto dto)
        {
            var user = _mapper.Map<User>(dto);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            user.CreatedAt = DateTime.Now;

            await _repo.Add(user);
            return user;
        }

        public async Task<object?> GetUser(int id)
        {
            return await _repo.GetById(id);
        }

        public async Task<bool> UpdateUser(int id, UserDto dto)
        {
            var user = await _repo.GetById(id);
            if (user == null) return false;

            user.FullName = dto.FullName;
            user.Email = dto.Email;

            await _repo.Update(user);
            return true;
        }
    }
}