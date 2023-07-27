
namespace backend.Domain.Entities
{
    public record Booking(
        Guid FlightId,
        string PassengerEmail,
        byte NumberOfSeats
        );
}
