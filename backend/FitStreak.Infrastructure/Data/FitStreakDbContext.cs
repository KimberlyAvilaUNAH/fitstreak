using Microsoft.EntityFrameworkCore;
using FitStreak.Domain.Entities;

namespace FitStreak.Infrastructure.Data;

public class FitStreakDbContext : DbContext
{
    public FitStreakDbContext(DbContextOptions<FitStreakDbContext> options) : base(options) { }

    public DbSet<RoutineGlobal> RoutinesGlobales { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Evitamos duplicados
        modelBuilder.Entity<RoutineGlobal>()
            .HasIndex(r => r.Nombre)
            .IsUnique();
    }
}