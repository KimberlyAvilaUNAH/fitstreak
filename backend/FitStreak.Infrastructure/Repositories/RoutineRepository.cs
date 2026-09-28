using Microsoft.EntityFrameworkCore;
using FitStreak.Application.Interfaces;
using FitStreak.Domain.Entities;
using FitStreak.Infrastructure.Data;

namespace FitStreak.Infrastructure.Repositories;

public class RoutineRepository : IRoutineRepository
{
    private readonly FitStreakDbContext _context;

    public RoutineRepository(FitStreakDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<RoutineGlobal>> GetAllAsync()
    {
        return await _context.RoutinesGlobales.ToListAsync();
    }

    public async Task<RoutineGlobal> AddAsync(RoutineGlobal routine)
    {
        await _context.RoutinesGlobales.AddAsync(routine);

        //Commit
        await _context.SaveChangesAsync();

        return routine;
    }
}