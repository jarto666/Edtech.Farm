using System.Collections.Immutable;
using Farm.Api.Persistence.Entities;

namespace Farm.Api.Persistence.Repositories;

public class AnimalsRepository(AnimalsContext context) : IAnimalsRepository
{
    public Task<IEnumerable<Animal>> GetAll()
    {
        return Task.FromResult<IEnumerable<Animal>>(context.Animals.ToImmutableList());
    }

    public Task<Animal?> GetByName(string name)
    {
        return Task.FromResult(context.Animals.FirstOrDefault(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)));
    }

    public Task<Animal?> Remove(Guid id)
    {
        var entity = context.Animals.FirstOrDefault(x => x.Id == id);
        if (entity == null)
        {
            return Task.FromResult<Animal?>(null);
        }
        
        context.Remove(entity);
        return Task.FromResult((Animal?)entity);
    }

    public Task<Animal> Create(string name)
    {
        var newEntity = new Animal()
        {
            Id = Guid.NewGuid(),
            Name = name
        };

        context.Animals.Add(newEntity);

        return Task.FromResult(newEntity);
    }
}