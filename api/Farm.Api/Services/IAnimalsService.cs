using CSharpFunctionalExtensions;
using Farm.Api.Contracts;
using Farm.Api.Errors;

namespace Farm.Api.Services;

public interface IAnimalsService
{
    Task<Result<IEnumerable<AnimalDto>>> GetAll();
    Task<Result<AnimalDto, ErrorDetails>> Remove(Guid id);
    Task<Result<AnimalDto, ErrorDetails>> Create(string name);
}