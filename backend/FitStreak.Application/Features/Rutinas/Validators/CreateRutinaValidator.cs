using FluentValidation;
using FitStreak.Application.Features.Rutinas.DTOs;

namespace FitStreak.Application.Features.Rutinas.Validators;

public class CreateRutinaValidator : AbstractValidator<CreateRutinaRequestDto>
{
    public CreateRutinaValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre de la rutina no puede estar vacío.")
            .MinimumLength(3).WithMessage("La rutina debe tener al menos 3 caracteres.")
            .MaximumLength(100).WithMessage("La rutina es demasiado larga.");
    }
}