using Microsoft.AspNetCore.Mvc;
using FitStreak.Application.Interfaces;
using FitStreak.Domain.Entities;

namespace FitStreak.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoutinesController : ControllerBase
{
    private readonly IRoutineRepository _repository;

    //Inyección de Dependencias
    public RoutinesController(IRoutineRepository repository)
    {
        _repository = repository;
    }

    //Lectura de datos
    [HttpGet]
    public async Task<IActionResult> GetRoutines()
    {
        var routines = await _repository.GetAllAsync();
        return Ok(routines); // HTTP 200 OK
    }

    //Creacion de un recurso
    [HttpPost]
    public async Task<IActionResult> CreateRoutine([FromBody] RoutineGlobal routine)
    {
        if (string.IsNullOrWhiteSpace(routine.Nombre))
        {
            return BadRequest("El nombre de la rutina es obligatorio.");
        }

        var nuevaRoutine = await _repository.AddAsync(routine);

        //Retorna recurso recién creado
        return CreatedAtAction(nameof(GetRoutines), new { id = nuevaRoutine.Id }, nuevaRoutine);
    }
}