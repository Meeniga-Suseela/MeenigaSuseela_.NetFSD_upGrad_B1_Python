using ElearningAPI.DTOs;

namespace ElearningAPI.Services
{
    public interface IQuizService
    {
        Task<int> SubmitQuiz(QuizSubmitDto dto);
    }
}