using System.Data;
using CSharpFunctionalExtensions;
using Farm.Api.Contracts;
using Farm.Api.Errors;
using Farm.Api.Extensions;
using Farm.Api.Persistence;
using Farm.Api.Persistence.Repositories;

namespace Farm.Api.Services;

public class AnimalsService(IAnimalsRepository repository, IUnitOfWork unitOfWork) : IAnimalsService
{
    public async Task<Result<IEnumerable<AnimalDto>>> GetAll()
    {
        var animals = await repository.GetAll();
        return Result.Success(animals.ToDto());
    }

    public async Task<Result<AnimalDto, ErrorDetails>> Remove(Guid id)
    {
        var result = await repository.Remove(id);
        if (result == null)
        {
            return Result.Failure<AnimalDto, ErrorDetails>(new ErrorDetails("Unable to remove inexistent animal", ErrorCode.NotFound));
        }
        
        await unitOfWork.Commit();
        return Result.Success<AnimalDto, ErrorDetails>(result.ToDto());
    }

    public async Task<Result<AnimalDto, ErrorDetails>> Create(string name)
    {
        var existingValue = await repository.GetByName(name);
        if (existingValue != null)
        {
            return Result.Failure<AnimalDto, ErrorDetails>(new ErrorDetails($"Animal with the name '{name}' already exists", ErrorCode.Conflict));
        }
        
        var result = await repository.Create(name);
        await unitOfWork.Commit();
        return Result.Success<AnimalDto, ErrorDetails>(result.ToDto());
    }
}