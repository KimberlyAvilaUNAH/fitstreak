using DotNetEnv;
using FitStreak.Infrastructure;
using FitStreak.Application;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection")
                       ?? throw new InvalidOperationException("Falta la cadena de conexión.");

// Leemos los orígenes permitidos desde el .env
var corsAllowedOrigins = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS") 
                         ?? throw new InvalidOperationException("Falta CORS_ALLOWED_ORIGINS en .env.");

builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);

// 1. DEFINICIÓN DE LA POLÍTICA DE SEGURIDAD CORS DINÁMICA
builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCorsFitStreak", policy =>
    {
        var origenes = corsAllowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        policy.WithOrigins(origenes)
            .SetIsOriginAllowedToAllowWildcardSubdomains() // Permite los comodines como *.unah.edu.hn
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// 2. ACTIVACIÓN DEL MIDDLEWARE CORS (Debe ir ANTES de MapControllers)
app.UseCors("PoliticaCorsFitStreak");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();