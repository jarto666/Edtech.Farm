using Farm.Api.Contracts;
using Farm.Api.Errors;
using Farm.Api.Persistence;
using Farm.Api.Persistence.Entities;
using Farm.Api.Persistence.Repositories;
using Farm.Api.Services;
using FluentAssertions;
using Moq;

namespace Farm.Api.UnitTests.Services;

[TestClass]
public class AnimalsServiceTests
{
    private readonly Mock<IAnimalsRepository> _animalsRepoMock = new();
    private readonly Mock<IUnitOfWork> _uowMock = new();

    private readonly AnimalsService _sut;

    public AnimalsServiceTests()
    {
        _sut = new AnimalsService(_animalsRepoMock.Object, _uowMock.Object);
    }
    
    [TestMethod]
    public async Task GetAll_Should_ReturnAll_When_NotEmpty()
    {
        // Arrange
        var expectedAnimals = new Animal[]
        {
            new() { Id = Guid.NewGuid(), Name = "Cow" },
            new() { Id = Guid.NewGuid(), Name = "Cat" },
        };
        _animalsRepoMock.Setup(x => x.GetAll())
            .ReturnsAsync(expectedAnimals);
        
        // Act
        var result = await _sut.GetAll();

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Count().Should().Be(2);
        result.Value.Should().BeEquivalentTo(expectedAnimals);
    }
    
    [TestMethod]
    public async Task GetAll_Should_ReturnEmpty_When_NoValues()
    {
        // Arrange
        var expectedAnimals = ArraySegment<Animal>.Empty;
        _animalsRepoMock.Setup(x => x.GetAll())
            .ReturnsAsync(expectedAnimals);
        
        // Act
        var result = await _sut.GetAll();

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEmpty();
    }
    
    [TestMethod]
    public async Task Remove_Should_ReturnNotFound_When_NothingToRemove()
    {
        // Act
        var result = await _sut.Remove(Guid.NewGuid());

        // Assert
        _uowMock.Verify(x => x.Commit(), Times.Never);
        result.IsSuccess.Should().BeFalse();
        result.Error.ErrorCode.Should().Be(ErrorCode.NotFound);
        result.Error.Message.Should().Be("Unable to remove inexistent animal");
    }
    
    [TestMethod]
    public async Task Remove_Should_ReturnRemovedValue_When_ElementToRemoveWasFound()
    {
        // Arrange
        var removedAnimal = new Animal()
        {
            Id = Guid.NewGuid(),
            Name = "Cow"
        };
        _animalsRepoMock.Setup(x => x.Remove(removedAnimal.Id))
            .ReturnsAsync(removedAnimal);
        
        // Act
        var result = await _sut.Remove(removedAnimal.Id);

        // Assert
        _uowMock.Verify(x => x.Commit(), Times.Once);
        result.IsSuccess.Should().BeTrue();
        result.Value.Id.Should().Be(removedAnimal.Id);
        result.Value.Name.Should().Be(removedAnimal.Name);
    }
    
    [TestMethod]
    public async Task Create_Should_ReturnConflict_When_SameNameExists()
    {
        // Arrange
        const string name = "Cow";
        _animalsRepoMock.Setup(x => x.GetByName(name))
            .ReturnsAsync(new Animal());
        
        // Act
        var result = await _sut.Create(name);

        // Assert
        _uowMock.Verify(x => x.Commit(), Times.Never);
        result.IsSuccess.Should().BeFalse();
        result.Error.ErrorCode.Should().Be(ErrorCode.Conflict);
        result.Error.Message.Should().Be($"Animal with the name '{name}' already exists");
    }
    
    [TestMethod]
    public async Task Create_Should_ReturnCreatedValue_When_ElementIsUnique()
    {
        // Arrange
        const string name = "Cow";
        var expectedAnimal = new Animal()
        {
            Id = Guid.NewGuid(),
            Name = name
        };
        _animalsRepoMock.Setup(x => x.Create(name))
            .ReturnsAsync(expectedAnimal);
        
        // Act
        var result = await _sut.Create(name);

        // Assert
        _uowMock.Verify(x => x.Commit(), Times.Once);
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(expectedAnimal);
    }
}