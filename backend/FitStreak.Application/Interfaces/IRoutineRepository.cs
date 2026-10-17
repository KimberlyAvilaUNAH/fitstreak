using FitStreak.Domain.Entities;

namespace FitStreak.Application.Interfaces;

public interface IRoutineRepository
{
    Task<IEnumerable<RoutineGlobal>> GetAllAsync();
    Task<RoutineGlobal> AddAsync(RoutineGlobal routine);
    
    // Nuevos métodos
    Task<RoutineGlobal?> GetByIdAsync(int id);
    Task UpdateAsync(RoutineGlobal routine);
    Task DeleteAsync(RoutineGlobal routine);
}