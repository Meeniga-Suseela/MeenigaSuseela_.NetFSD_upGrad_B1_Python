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
    public class QuizController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public QuizController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("quizzes/{courseId}")]
        public async Task<IActionResult> GetQuiz(int courseId)
        {
            var quizzes = await _context.Quizzes
                .Where(q => q.CourseId == courseId)
                .AsNoTracking()
                .ToListAsync();

            return Ok(quizzes);
        }

        [HttpPost("quizzes")]
        public async Task<IActionResult> CreateQuiz(QuizDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var quiz = _mapper.Map<Quiz>(dto);

            _context.Quizzes.Add(quiz);
            await _context.SaveChangesAsync();

            return StatusCode(201, quiz);
        }

        [HttpGet("quizzes/{quizId}/questions")]
        public async Task<IActionResult> GetQuestions(int quizId)
        {
            var questions = await _context.Questions
                .Where(q => q.QuizId == quizId)
                .AsNoTracking()
                .ToListAsync();

            return Ok(questions);
        }

        [HttpPost("questions")]
        public async Task<IActionResult> AddQuestion(QuestionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var question = _mapper.Map<Question>(dto);

            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return StatusCode(201, question);
        }

    }
}