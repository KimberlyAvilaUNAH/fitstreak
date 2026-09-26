using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using FitStreak.Application.Interfaces;
using FitStreak.Infrastructure.Data;
using FitStreak.Infrastructure.Repositories;

namespace FitStreak.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        // 1. Configuramos el acceso a PostgreSQL
        services.AddDbContext<FitStreakDbContext>(options =>
            options.UseNpgsql(connectionString));

        // 2. LA INYECCIÓN CLAVE:
        // "Cada vez que un Chef (Controlador) pida la Receta (IRoutineRepository),
        //  entrégale los datos de la Finca PostgreSQL (RoutineRepository)"
        services.AddScoped<IRoutineRepository, RoutineRepository>();

        return services;
    }
}