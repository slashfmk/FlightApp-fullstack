
namespace backend.Domain.Entities
{
    public class Booking
    {

        public string PassengerEmail { get; set; }
        public byte NumberOfSeats { get; set; }

        public Booking()
        {
        }
        public Booking(string PassengerEmail, byte NumberOfSeats)
        {
            this.PassengerEmail = PassengerEmail;
            this.NumberOfSeats = NumberOfSeats;
        }

    }
}
