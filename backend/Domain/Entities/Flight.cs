
using backend.Domain.Errors;

namespace backend.Domain.Entities
{
    public class Flight
    {
        public List<Booking> bookings = new();

        public Guid Id { get; set; } = default!;
        public string Airline { get; set; } = default!;
        public double Price { get; set; } = default!;
        public TimePlace Departure { get; set; } = default!;
        public TimePlace Arrival { get; set; } = default!;
        public int RemainingSeats { get; set; } = default!;


        public Flight()
        {
        }

        public Flight(Guid Id, string Airline, double Price, TimePlace Departure, TimePlace Arrival, int RemainingSeats)
        {
            this.Id = Id;
            this.Price = Price;
            this.Departure = Departure;
            this.Arrival = Arrival;
            this.RemainingSeats = RemainingSeats;
            this.Airline = Airline;
        }

        public Error? MakeBooking(string PassengerEmail, byte NumberOfSeats)
        {
            // Not enough seats available for booking request
            if (this.RemainingSeats < NumberOfSeats) return new OverbookError();
            // Then add that booking when everything goes well
            this.bookings.Add(new Booking(PassengerEmail, NumberOfSeats));
            // Update the number of available seats
            this.RemainingSeats -= NumberOfSeats;
            return null;
        }
    }
}