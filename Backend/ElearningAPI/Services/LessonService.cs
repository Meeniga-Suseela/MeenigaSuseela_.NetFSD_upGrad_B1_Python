using ElearningAPI.DTOs;
using ElearningAPI.Models;
using ElearningAPI.Repositories;
using AutoMapper;

namespace ElearningAPI.Services
{
    public class LessonService : ILessonService
    {
        private readonly ILessonRepository _repo;
        private readonly IMapper _mapper;

        public LessonService(ILessonRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<object>> GetLessons(int courseId)
        {
            return await _repo.GetByCourseId(courseId);
        }

        public async Task<object> AddLesson(LessonDto dto)
        {
            var lesson = _mapper.Map<Lesson>(dto);

            await _repo.Add(lesson);
            return lesson;
        }

        public async Task<bool> UpdateLesson(int id, LessonDto dto)
        {
            var lesson = await _repo.GetById(id);
            if (lesson == null) return false;

            _mapper.Map(dto, lesson);
            await _repo.Update(lesson);

            return true;
        }

        public async Task<bool> DeleteLesson(int id)
        {
            var lesson = await _repo.GetById(id);
            if (lesson == null) return false;

            await _repo.Delete(lesson);
            return true;
        }
    }
}