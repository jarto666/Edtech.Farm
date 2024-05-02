namespace Farm.Api.Persistence;

public class UnitOfWork(AnimalsContext context) : IUnitOfWork
{
    public async Task Commit()
    {
        await context.SaveChangesAsync();
    }
}