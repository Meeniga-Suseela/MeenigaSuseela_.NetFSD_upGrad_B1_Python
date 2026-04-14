using ElearningAPI.Models;

namespace ElearningAPI.Repositories
{
    public interface IQuizRepository
    {
        Task<IEnumerable<Quiz>> GetByCourseId(int courseId);
        Task Add(Quiz quiz);
        Task<IEnumerable<Question>> GetQuestions(int quizId);
        Task AddQuestion(Question question);
    }
}