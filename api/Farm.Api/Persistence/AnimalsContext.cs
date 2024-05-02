using Microsoft.EntityFrameworkCore;

namespace Farm.Api.Persistence;

public class AnimalsContext(DbContextOptions<AnimalsContext> options) : DbContext(options)
{
    public DbSet<Entities.Animal> Animals { get; set; }
}