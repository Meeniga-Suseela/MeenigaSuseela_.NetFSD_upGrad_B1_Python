using ElearningAPI.DTOs;
using ElearningAPI.Models;
using ElearningAPI.Repositories;
using AutoMapper;

namespace ElearningAPI.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _repo;
        private readonly IMapper _mapper;

        public CourseService(ICourseRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CourseDto>> GetAllCourses()
        {
            var courses = await _repo.GetAll();
            return _mapper.Map<IEnumerable<CourseDto>>(courses);
        }

        public async Task<CourseDto?> GetCourseById(int id)
        {
            var course = await _repo.GetById(id);
            if (course == null) return null;

            return _mapper.Map<CourseDto>(course);
        }

        // ✅ OK
        public async Task<CourseDto> CreateCourse(CourseDto dto)
        {
            var course = _mapper.Map<Course>(dto);
            course.CreatedAt = DateTime.Now;

            await _repo.Add(course);

            return _mapper.Map<CourseDto>(course);
        }

        // ✅ OK
        public async Task<bool> UpdateCourse(int id, CourseDto dto)
        {
            var course = await _repo.GetById(id);
            if (course == null) return false;

            course.Title = dto.Title;
            course.Description = dto.Description;
            course.CreatedBy = dto.CreatedBy;
            await _repo.Update(course);

            return true;
        }

        // ✅ OK
        public async Task<bool> DeleteCourse(int id)
        {
            var course = await _repo.GetById(id);
            if (course == null) return false;

            await _repo.Delete(course);
            return true;
        }
    }
}