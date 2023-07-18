using backend.models;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FlightController : ControllerBase
{


    private static List<BookDto> bookings = new();
    private static Random Randomize = new Random();
    
    private static List<FlightRm> Flights = new List<FlightRm> {
        new FlightRm(
                   Guid.NewGuid(),
                   "United airline", Randomize.NextInt64(3000),
                   new TimePlaceRm("Ottawa", DateTime.Now),
                   new TimePlaceRm("kinshasa", DateTime.Now),
                   (int)Randomize.NextInt64(500)
                   ),

        new FlightRm(
            Guid.NewGuid(),
            "Africa airline", Randomize.NextInt64(3000),
            new TimePlaceRm("Los angeles", DateTime.Now),
            new TimePlaceRm("Johannesburg", DateTime.Now),
             (int)Randomize.NextInt64(500)
            ),

        new FlightRm(
        Guid.NewGuid(),
        "Wonderful airline", Randomize.NextInt64(3000),
        new TimePlaceRm("Minnesota", DateTime.Now),
        new TimePlaceRm("New Hampshire", DateTime.Now),
         (int)Randomize.NextInt64(500)
        )
    };



    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(List<FlightRm>), 200)]
    [HttpGet(Name = "GetSearch")]
    public ActionResult<List<FlightRm>> Search()
    {
        return Ok(Flights);
    }


    [ProducesResponseType(404)]
    [ProducesResponseType(typeof(FlightRm), 200)]
    [HttpGet("{id}", Name = "GetSearchById")]
    public ActionResult<FlightRm> Find(Guid id)
    {
        var FoundFlight = Flights.SingleOrDefault(f => f.Id == id);

        if (FoundFlight == null) return NotFound();
        return Ok(FoundFlight);
    }

    [HttpPost("/Booking")]
    [ProducesResponseType(201)]
    [ProducesResponseType(500)]
    [ProducesResponseType(400)]
    public ActionResult<string> Book(BookDto bookDto)
    {
        bookings.Add(bookDto);
        var confirmation = $"user: {bookDto.PassengerEmail} booked for flight {bookDto.FlightId}";
        return Created("Booking created", confirmation);
    }

    [HttpGet("/Bookings")]
    public ActionResult<List<BookDto>> Bookings()
    {
        return bookings;
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
