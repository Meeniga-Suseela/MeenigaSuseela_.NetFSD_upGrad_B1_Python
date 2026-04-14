using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElearningAPI.Data;
using ElearningAPI.DTOs;
using ElearningAPI.Models;
using AutoMapper;

namespace ElearningAPI.Controllers
{
    [ApiController]
    [Route("api")]
    public class LessonsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public LessonsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("courses/{courseId}/lessons")]
        public async Task<IActionResult> GetLessons(int courseId)
        {
            var lessons = await _context.Lessons
                .Where(l => l.CourseId == courseId)
                .AsNoTracking()
                .ToListAsync();

            return Ok(lessons);
        }

        [HttpPost("lessons")]
        public async Task<IActionResult> AddLesson(LessonDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lesson = _mapper.Map<Lesson>(dto);

            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return StatusCode(201, lesson);
        }

        [HttpPut("lessons/{id}")]
        public async Task<IActionResult> UpdateLesson(int id, LessonDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null) return NotFound();

            _mapper.Map(dto, lesson);

            await _context.SaveChangesAsync();
            return Ok(lesson);
        }

        [HttpDelete("lessons/{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null) return NotFound();

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}