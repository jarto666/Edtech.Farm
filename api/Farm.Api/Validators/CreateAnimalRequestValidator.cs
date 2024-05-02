using Farm.Api.Contracts;
using FluentValidation;

namespace Farm.Api.Validators;

public class CreateAnimalRequestValidator : AbstractValidator<CreateAnimalRequest> 
{
    public CreateAnimalRequestValidator() 
    {
        RuleFor(x => x.Name)
            .MaximumLength(100)
            .NotEmpty();
    }
}