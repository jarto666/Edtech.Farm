using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Farm.Api.Persistence.Entities;

[Table("Animals")]
public class Animal
{
    [Key]
    public Guid Id { get; init; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; init; } = null!;
}