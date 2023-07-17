namespace backend.Dtos
{
    public record BookDto (Guid FlightId, string PassengerEmail, byte NumberOfSeats);
}
