using backend.models;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FlightController : ControllerBase
{


    static private List<FlightRm> Flights = new();
    static private Random Randomize = new Random();


    private void LoadFlights()
    {
        Flights.Add(new FlightRm(
                   Guid.NewGuid(),
                   "United airline", Randomize.NextInt64(3000),
                   new TimePlaceRm("Ottawa", DateTime.Now),
                   new TimePlaceRm("kinshasa", DateTime.Now),
                   (int)Randomize.NextInt64(500)
                   ));

        Flights.Add(new FlightRm(
            Guid.NewGuid(),
            "Africa airline", Randomize.NextInt64(3000),
            new TimePlaceRm("Los angeles", DateTime.Now),
            new TimePlaceRm("Johannesburg", DateTime.Now),
             (int) Randomize.NextInt64(500)
            ));

        Flights.Add(new FlightRm(
        Guid.NewGuid(),
        "Wonderful airline", Randomize.NextInt64(3000),
        new TimePlaceRm("Minnesota", DateTime.Now),
        new TimePlaceRm("New Hampshire", DateTime.Now),
         (int) Randomize.NextInt64(500)
        ));
    }


    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(List<FlightRm>), 200)]
    [HttpGet(Name = "GetSearch")]
    public ActionResult<List<FlightRm>> Search()
    {
        this.LoadFlights();
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

}
