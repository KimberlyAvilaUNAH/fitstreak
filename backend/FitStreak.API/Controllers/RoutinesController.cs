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
    private readonly IValidator<CreateRutinaRequestDto> _createValidator;
    private readonly IValidator<UpdateRutinaRequestDto> _updateValidator;

    public RoutinesController(
        IRoutineRepository repository, 
        IValidator<CreateRutinaRequestDto> createValidator,
        IValidator<UpdateRutinaRequestDto> updateValidator)
    {
        _repository = repository;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    // GET: api/routines
    [HttpGet]
    public async Task<IActionResult> GetRoutines()
    {
        var routines = await _repository.GetAllAsync();
        var response = routines.Select(r => new RutinaResponseDto { Id = r.Id, Nombre = r.Nombre });
        return Ok(response);
    }

    // GET: api/routines/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoutineById(int id)
    {
        var routine = await _repository.GetByIdAsync(id);
        
        if (routine == null)
        {
            return NotFound("La rutina solicitada no existe."); 
        }

        var response = new RutinaResponseDto { Id = routine.Id, Nombre = routine.Nombre };
        return Ok(response); 
    }

    // POST: api/routines
    [HttpPost]
    public async Task<IActionResult> CreateRoutine([FromBody] CreateRutinaRequestDto request)
    {
        var validationResult = await _createValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var nuevaRoutine = new RoutineGlobal { Nombre = request.Nombre };
        var routineCreada = await _repository.AddAsync(nuevaRoutine);
        var response = new RutinaResponseDto { Id = routineCreada.Id, Nombre = routineCreada.Nombre };

        return CreatedAtAction(nameof(GetRoutineById), new { id = response.Id }, response);
    }

    // PUT: api/routines/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRoutine(int id, [FromBody] UpdateRutinaRequestDto request)
    {
        // Valida DTO
        var validationResult = await _updateValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        // Verifica si existe
        var routine = await _repository.GetByIdAsync(id);
        if (routine == null)
        {
            return NotFound("La rutina solicitada no existe."); 
        }

        // Mapea y actualiza
        routine.Nombre = request.Nombre;
        await _repository.UpdateAsync(routine);

        return NoContent(); 
    }

    // DELETE: api/routines/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoutine(int id)
    {
        var routine = await _repository.GetByIdAsync(id);
        if (routine == null)
        {
            return NotFound("La rutina solicitada no existe.");
        }

        await _repository.DeleteAsync(routine);

        return NoContent();
    }
}