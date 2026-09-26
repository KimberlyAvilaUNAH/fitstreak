using Microsoft.EntityFrameworkCore;
using FitStreak.Application.Interfaces;
using FitStreak.Domain.Entities;
using FitStreak.Infrastructure.Data;

namespace FitStreak.Infrastructure.Repositories;

// Implementamos la interfaz (la finca obedece a la receta)
public class RoutineRepository : IRoutineRepository
{
    private readonly FitStreakDbContext _context;

    // El constructor recibe el contexto de EF Core
    public RoutineRepository(FitStreakDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<RoutineGlobal>> GetAllAsync()
    {
        return await _context.RoutinesGlobales.ToListAsync();
    }
}