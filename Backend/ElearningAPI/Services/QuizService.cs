using ElearningAPI.Data;
using ElearningAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ElearningAPI.Services
{
    public class QuizService : IQuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> SubmitQuiz(QuizSubmitDto dto)
        {
            var questions = await _context.Questions
                .Where(q => q.QuizId == dto.QuizId)
                .ToListAsync();

            int score = 0;

            foreach (var ans in dto.Answers)
{
    var question = questions.FirstOrDefault(q => q.QuestionId == ans.QuestionId);

    if (question != null &&
        question.CorrectAnswer.Trim().ToUpper() ==
        ans.Answer.Trim().ToUpper())
    {
        score++;
    }
}
            return score;
        }
    }
}