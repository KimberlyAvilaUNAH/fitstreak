using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using FitStreak.Application.Interfaces;
using FitStreak.Domain.Entities;
using FitStreak.Application.Features.Rutinas.DTOs;

namespace FitStreak.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoutinesController : ControllerBase
{
    private readonly IRoutineRepository _repository;
    private readonly IValidator<CreateRutinaRequestDto> _validator;

    public RoutinesController(IRoutineRepository repository, IValidator<CreateRutinaRequestDto> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetRoutines()
    {
        var routines = await _repository.GetAllAsync();

        // Mapeo Manual: Entidad -> DTO
        var response = routines.Select(r => new RutinaResponseDto
        {
            Id = r.Id,
            Nombre = r.Nombre
        });

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRoutine([FromBody] CreateRutinaRequestDto request)
    {
        // 1. Ejecutar FluentValidation
        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors); // HTTP 400 con detalles
        }

        // 2. Mapeo Manual: DTO -> Entidad
        var nuevaRoutine = new RoutineGlobal
        {
            Nombre = request.Nombre
        };

        // 3. Persistencia
        var routineCreada = await _repository.AddAsync(nuevaRoutine);

        // 4. Mapeo de Retorno: Entidad -> DTO
        var response = new RutinaResponseDto
        {
            Id = routineCreada.Id,
            Nombre = routineCreada.Nombre
        };

        return CreatedAtAction(nameof(GetRoutines), new { id = response.Id }, response);
    }
}