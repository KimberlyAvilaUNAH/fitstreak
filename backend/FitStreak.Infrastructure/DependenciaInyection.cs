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
        // Se configura el acceso a PostgreSQL
        services.AddDbContext<FitStreakDbContext>(options =>
            options.UseNpgsql(connectionString));

        // Inyeccion
        services.AddScoped<IRoutineRepository, RoutineRepository>();

        return services;
    }
}