using ElearningAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace ElearningAPI.Services
{
    public class ResultService : IResultService
    {
        private readonly AppDbContext _context;

        public ResultService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>> GetResults(int userId)
        {
            return await _context.Results
                .Where(r => r.UserId == userId)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}