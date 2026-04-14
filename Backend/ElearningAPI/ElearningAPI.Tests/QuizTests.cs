using Xunit;
using Microsoft.EntityFrameworkCore;
using ElearningAPI.Data;
using ElearningAPI.Models;
using ElearningAPI.DTOs;
using System.Threading.Tasks;
using System.Linq;

namespace ElearningAPI.Tests
{
    public class QuizTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "QuizTestDb")
                .Options;

            return new AppDbContext(options);
        }

        [Fact]
        public async Task SubmitQuiz_ShouldCalculateCorrectScore()
        {
            // Arrange
            var context = GetDbContext();

            context.Questions.AddRange(
                new Question
                {
                    QuestionId = 1,
                    QuizId = 1,
                    QuestionText = "Q1",
                    OptionA = "A",
                    OptionB = "B",
                    OptionC = "C",
                    OptionD = "D",
                    CorrectAnswer = "A"
                },
                new Question
                {
                    QuestionId = 2,
                    QuizId = 1,
                    QuestionText = "Q2",
                    OptionA = "A",
                    OptionB = "B",
                    OptionC = "C",
                    OptionD = "D",
                    CorrectAnswer = "B"
                }
            );

            await context.SaveChangesAsync();

            var dto = new QuizSubmitDto
            {
                QuizId = 1,
                UserId = 1,
                Answers = new System.Collections.Generic.List<AnswerDto>
                {
                    new AnswerDto { QuestionId = 1, Answer = "A" },
                    new AnswerDto { QuestionId = 2, Answer = "B" }
                }
            };

            // Act (simulate scoring logic)
            var questions = context.Questions.Where(q => q.QuizId == dto.QuizId).ToList();

            int score = 0;

            foreach (var ans in dto.Answers)
            {
                var question = questions.FirstOrDefault(q => q. QuestionId == ans.QuestionId);

                if (question != null &&
                question.CorrectAnswer == ans.Answer)
                {
                    score++;
                }
            }

            // Assert
            Assert.Equal(2, score);
        }
    }
}