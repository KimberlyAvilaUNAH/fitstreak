using FitStreak.Domain.Entities;

namespace FitStreak.Application.Interfaces;

public interface IRoutineRepository
{
    Task<IEnumerable<RoutineGlobal>> GetAllAsync();
    Task<RoutineGlobal> AddAsync(RoutineGlobal routine);  // Agregamos el contrato para el POST
}