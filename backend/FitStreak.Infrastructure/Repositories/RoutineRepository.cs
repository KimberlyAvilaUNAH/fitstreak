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
        await _context.SaveChangesAsync();
        return routine;
    }

    // Nuevos métodos

    public async Task<RoutineGlobal?> GetByIdAsync(int id)
    {
        // Busca llave primaria y tare los datos
        return await _context.RoutinesGlobales
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task UpdateAsync(RoutineGlobal routine)
    {
        _context.RoutinesGlobales.Update(routine);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(RoutineGlobal routine)
    {
        _context.RoutinesGlobales.Remove(routine);
        await _context.SaveChangesAsync();
    }
}