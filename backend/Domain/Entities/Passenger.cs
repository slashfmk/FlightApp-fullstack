
namespace backend.Domain.Entities
{
    public record Passenger(
        string Email,
        string FirstName,
        string LastName,
        bool IsFemale);
}