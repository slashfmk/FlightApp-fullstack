using backend.models;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos;
using backend.Domain.Entities;
using backend.Domain.Errors;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FlightController : ControllerBase
{

    private readonly Entities _entities;

    public FlightController(Entities entities)
    {
        _entities = entities;
    }

    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(List<FlightRm>), 200)]
    [HttpGet(Name = "GetSearch")]
    public ActionResult<List<FlightRm>> Search()
    {

        var flightRmList = _entities.Flights.Select(Flight => new FlightRm(
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
        var FoundFlight = _entities.Flights.SingleOrDefault(f => f.Id == id);

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

        var flight = _entities.Flights.SingleOrDefault(f => f.Id == bookDto.FlightId);

        if (flight is null) return NotFound();

        var Error = flight.MakeBooking(bookDto.PassengerEmail, bookDto.NumberOfSeats);

        if (Error is OverbookError) return Conflict(new { message = "Sorry, Not enough seats available" });
        if (Error is NotPositiveError) return Conflict(new { message = "You cannot provide a negative number of seats" });

        var confirmation = $"user: {bookDto.PassengerEmail} booked for flight {bookDto.FlightId}";
        return Created("Booking created", confirmation);
    }

    [HttpGet("/Bookings")]
    public ActionResult<List<BookDto>> Bookings()
    {
        var MyBookings = _entities.bookings.Select(Book => new Booking(Book.PassengerEmail, Book.NumberOfSeats)).ToList();
        return Ok(MyBookings);
    }

    [HttpGet("/MyBookings/{userEmail}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(500)]
    [ProducesResponseType(400)]
    public ActionResult<List<BookDto>> MyBookings(string userEmail)
    {
        var MyBookings = _entities.bookings.FindAll(bk => bk.PassengerEmail == userEmail);
        return Ok(MyBookings);
    }

}
