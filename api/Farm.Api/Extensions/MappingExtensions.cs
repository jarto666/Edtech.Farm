using Farm.Api.Contracts;
using Farm.Api.Persistence.Entities;

namespace Farm.Api.Extensions;

public static class MappingExtensions
{
    public static AnimalDto ToDto(this Animal animal) => new(animal.Id, animal.Name);

    public static IEnumerable<AnimalDto> ToDto(this IEnumerable<Animal> animals)
    {
        return animals.Select(ToDto);
    }
}