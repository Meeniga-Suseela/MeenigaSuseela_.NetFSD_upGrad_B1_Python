using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElearningAPI.Data;
using ElearningAPI.Models;
using ElearningAPI.DTOs;

namespace ElearningAPI.Controllers
{
    [ApiController]
    [Route("api/results")]
    //[Tags("Quiz Attempt")]  
    public class QuizAttemptController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuizAttemptController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("quizzes/{quizId}/submit")]
        public async Task<IActionResult> SubmitQuiz(int quizId, [FromBody]QuizSubmitDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            if (dto.QuizId != quizId)
                return BadRequest("QuizId mismatch");

            var userExists = await _context.Users
                .AnyAsync(u => u.UserId == dto.UserId);

            if (!userExists)
                return BadRequest("Invalid UserId");

            var questions = await _context.Questions
                .Where(q => q.QuizId == quizId)
                .OrderBy(q => q.QuestionId)
                .ToListAsync();

            if (questions == null || !questions.Any())
                return BadRequest("No questions found");

            if (dto.Answers.Count != questions.Count)
                return BadRequest($"Expected {questions.Count} answers but got {dto.Answers.Count}");

            int score = 0;

            foreach (var ans in dto.Answers)
            {
                var question = questions.FirstOrDefault(q => q.QuestionId == ans.QuestionId);

                if (question == null)
                    return BadRequest($"Invalid QuestionId: {ans.QuestionId}");

                if (question != null &&
                question.CorrectAnswer.Trim().ToUpper() ==
                ans.Answer.Trim().ToUpper())
                {
                    score++;
                }
            }

            var result = new Result
            {
                UserId = dto.UserId,
                QuizId = quizId,
                Score = score,
                AttemptDate = DateTime.Now
            };

            _context.Results.Add(result);
            await _context.SaveChangesAsync();

            return Ok(new { score });
        }

        [HttpGet("{userId}")]
public async Task<IActionResult> GetResults(int userId)
{
    var results = await _context.Results
        .Where(r => r.UserId == userId)
        .GroupBy(r => r.QuizId)
        .Select(g => g
            .OrderByDescending(r => r.AttemptDate)
            .First())
        .AsNoTracking()
        .ToListAsync();

    return Ok(results);
}
    }
}