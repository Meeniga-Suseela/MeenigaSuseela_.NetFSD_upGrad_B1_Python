using ElearningAPI.Data;
using ElearningAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ElearningAPI.Repositories
{
    public class ResultRepository : IResultRepository
    {
        private readonly AppDbContext _context;

        public ResultRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Result>> GetByUserId(int userId)
        {
            return await _context.Results
                .Where(r => r.UserId == userId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task Add(Result result)
        {
            await _context.Results.AddAsync(result);
            await _context.SaveChangesAsync();
        }
    }
}