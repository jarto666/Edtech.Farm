namespace Farm.Api.Persistence;

public interface IUnitOfWork
{
    Task Commit();
}