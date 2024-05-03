using CSharpFunctionalExtensions;
using Farm.Api.Contracts;
using Farm.Api.Errors;
using Farm.Api.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Farm.Api.Controllers;

[Route("api/animals")]
[ApiController]
public class AnimalsController(IAnimalsService animalsService, IValidator<CreateAnimalRequest> createRequestValidator) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(AnimalDto[]), StatusCodes.Status200OK)]
    [Route("")]
    public async Task<IActionResult> GetAll()
    {
        var animals = await animalsService.GetAll();
        return Ok(animals.Value);
    }

    [HttpPost]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(AnimalDto), StatusCodes.Status200OK)]
    [Route("")]
    public async Task<IActionResult> Create(CreateAnimalRequest request)
    {
        var requestValidResult = await createRequestValidator.ValidateAsync(request);
        if (!requestValidResult.IsValid)
        {
            return BadRequest(requestValidResult.ToString());
        }
            
        var animal = await animalsService.Create(request.Name);
        return FormatResponse(animal);
    }

    [HttpDelete]
    [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(AnimalDto), StatusCodes.Status200OK)]
    [Route("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var animal = await animalsService.Remove(id);
        return FormatResponse(animal);
    }

    private IActionResult FormatResponse<TV>(Result<TV, ErrorDetails> result)
    {
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }

        return result.Error.ErrorCode switch
        {
            ErrorCode.NotFound => NotFound(result.Error.Message),
            ErrorCode.Conflict => Conflict(result.Error.Message),
            _ => StatusCode(StatusCodes.Status500InternalServerError, $"An unexpected error occurred. Details: {result.Error.Message}")
        };
    }
}