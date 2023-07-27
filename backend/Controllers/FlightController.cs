using backend.models;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos;
using backend.Domain.Entities;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FlightController : ControllerBase
{


    private static List<Booking> bookings = new();

    private static Random Randomize = new Random();

    private static List<Flight> Flights = new List<Flight> {
        new Flight(
                   Guid.NewGuid(),
                   "United airline", Randomize.NextInt64(3000),
                   new TimePlace("Ottawa", DateTime.Now),
                   new TimePlace("kinshasa", DateTime.Now),
                   (int)Randomize.NextInt64(500)
                   ),

        new Flight(
            Guid.NewGuid(),
            "Africa airline", Randomize.NextInt64(3000),
            new TimePlace("Los angeles", DateTime.Now),
            new TimePlace("Johannesburg", DateTime.Now),
             (int)Randomize.NextInt64(500)
            ),

        new Flight(
        Guid.NewGuid(),
        "Wonderful airline", Randomize.NextInt64(3000),
        new TimePlace("Minnesota", DateTime.Now),
        new TimePlace("New Hampshire", DateTime.Now),
         (int)Randomize.NextInt64(500)
        )
    };



    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(List<FlightRm>), 200)]
    [HttpGet(Name = "GetSearch")]
    public ActionResult<List<FlightRm>> Search()
    {

        var flightRmList = Flights.Select(Flight => new FlightRm(
            Flight.Id,
            Flight.Airline,
            Flight.Price,
            new TimePlaceRm(Flight.Departure.Place, Flight.Departure.Time),
            new TimePlaceRm(Flight.Arrival.Place, Flight.Arrival.Time),
            Flight.RemainingSeats
        )).ToList();

        return Ok(flightRmList);
    }


    [ProducesResponseType(404)]
    [ProducesResponseType(typeof(FlightRm), 200)]
    [HttpGet("{id}")]
    public ActionResult<FlightRm> Find(Guid id)
    {
        var FoundFlight = Flights.SingleOrDefault(f => f.Id == id);

        var readModel = new FlightRm(
            FoundFlight.Id,
            FoundFlight.Airline,
            FoundFlight.Price,
            new TimePlaceRm(FoundFlight.Departure.Place, FoundFlight.Departure.Time),
            new TimePlaceRm(FoundFlight.Arrival.Place, FoundFlight.Arrival.Time),
            FoundFlight.RemainingSeats
        );

        if (FoundFlight == null) return NotFound();
        return Ok(readModel);
    }

    [HttpPost("/Booking")]
    [ProducesResponseType(201)]
    [ProducesResponseType(500)]
    [ProducesResponseType(400)]
    [ProducesResponseType(409)]
    public ActionResult<string> Book(BookDto bookDto)
    {

        var flight = Flights.SingleOrDefault(f => f.Id == bookDto.FlightId);

        if (flight is null) return NotFound();
        // Not enough seats available for booking request
        if (flight.RemainingSeats < bookDto.NumberOfSeats) return Conflict("Sorry, Not enough seats available");
        // Check for valid number of seats request
        if (bookDto.NumberOfSeats <= 0) return Conflict("You cannot book 0 or a negative number of seats");
        // Then add that booking when everything goes well
        flight.bookings.Add(new Booking(bookDto.FlightId, bookDto.PassengerEmail, bookDto.NumberOfSeats));
        // Update the number of available seats
        flight.RemainingNumberOfSeats -= bookDto.NumberOfSeats;

        var confirmation = $"user: {bookDto.PassengerEmail} booked for flight {bookDto.FlightId}";
        return Created("Booking created", confirmation);
    }

    [HttpGet("/Bookings")]
    public ActionResult<List<BookDto>> Bookings()
    {
        return bookings.Select( Book => new BookDto(Book.FlightId, Book.PassengerEmail, Book.NumberOfSeats)).ToList();
    }

    [HttpGet("/MyBookings/{userEmail}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(500)]
    [ProducesResponseType(400)]
    public ActionResult<List<BookDto>> MyBookings(string userEmail)
    {
        var MyBookings = bookings.FindAll(bk => bk.PassengerEmail == userEmail);
        return Ok(MyBookings);
    }

}
