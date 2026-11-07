using FluentValidation;
using FitStreak.Application.Features.Rutinas.DTOs;
using FitStreak.Application.Interfaces;

namespace FitStreak.Application.Features.Rutinas.Validators;

public class CreateRutinaValidator : AbstractValidator<CreateRutinaRequestDto>
{
    private readonly IRoutineRepository _repository;

    public CreateRutinaValidator(IRoutineRepository repository)
    {
        _repository = repository;

        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre de la rutina no puede estar vacío.")
            .MinimumLength(3).WithMessage("La rutina debe tener al menos 3 caracteres.")
            .MaximumLength(100).WithMessage("La rutina es demasiado larga.")
            .MustAsync(async (nombre, cancellation) => 
            {
                // Consultamos a la BD si el nombre ya existe, para que no existan datos repetidos
                var existentes = await _repository.GetAllAsync();
                return !existentes.Any(r => r.Nombre.ToLower() == nombre.ToLower());
            }).WithMessage("Ya existe una rutina con ese nombre en el catálogo.");
    }
}