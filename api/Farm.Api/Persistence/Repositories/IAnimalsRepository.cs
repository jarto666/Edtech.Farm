using Farm.Api.Persistence.Entities;

namespace Farm.Api.Persistence.Repositories;

public interface IAnimalsRepository
{
    Task<IEnumerable<Animal>> GetAll();
    
    Task<Animal?> GetByName(string name);
    
    Task<Animal?> Remove(Guid id);
    
    Task<Animal> Create(string name);
}