
namespace backend.Domain.Entities
{
    public record Flight(
        Guid Id,
        string Airline,
        double Price,
        TimePlace Departure,
        TimePlace Arrival,
        int RemainingSeats
    ) {
        public List<Booking> bookings = new();
        public int RemainingNumberOfSeats { get; set; } = RemainingSeats;
    }
}