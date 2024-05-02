using Farm.Api.Persistence;
using Farm.Api.Persistence.Repositories;
using Farm.Api.Services;
using Farm.Api.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddDbContext<AnimalsContext>(opt =>
    opt.UseInMemoryDatabase("AnimalsDb"));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAnimalsService, AnimalsService>();
builder.Services.AddScoped<IAnimalsRepository, AnimalsRepository>();

builder.Services.AddValidatorsFromAssemblyContaining<CreateAnimalRequestValidator>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();