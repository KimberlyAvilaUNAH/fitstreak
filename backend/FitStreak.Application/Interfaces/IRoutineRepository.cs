using FitStreak.Domain.Entities;

namespace FitStreak.Application.Interfaces;

public interface IRoutineRepository
{
    Task<IEnumerable<RoutineGlobal>> GetAllAsync();
}