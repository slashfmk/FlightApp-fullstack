
using backend.Domain.Errors;

namespace backend.Domain.Entities
{
    public record Flight(
        Guid Id,
        string Airline,
        double Price,
        TimePlace Departure,
        TimePlace Arrival,
        int RemainingSeats
    )
    {
        public List<Booking> bookings = new();
        public int RemainingSeats { get; set; } = RemainingSeats;

        public object? MakeBooking(string PassengerEmail, byte NumberOfSeats)
        {
            // Not enough seats available for booking request
            if (this.RemainingSeats < NumberOfSeats) return new OverbookError();
            // Check for valid number of seats request
            if (NumberOfSeats <= 0) return new NotPositiveError();
            // Then add that booking when everything goes well
            this.bookings.Add(new Booking(PassengerEmail, NumberOfSeats));
            // Update the number of available seats
            this.RemainingSeats -= NumberOfSeats;
            return null;
        }
    }
}