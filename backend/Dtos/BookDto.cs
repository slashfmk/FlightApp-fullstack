using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public record BookDto(
        [Required]
        Guid FlightId,
        [Required]
        [EmailAddress]
        string PassengerEmail,
        [Required]
        [Range(1, 254)]
        byte NumberOfSeats
        );
}
