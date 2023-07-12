using backend.models;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FlightController : ControllerBase
{

    private readonly ILogger<FlightController> _logger;

    private List<FlightRm> Flights;

    private Random Randomize = new Random();

    public FlightController(ILogger<FlightController> logger)
    {
        _logger = logger;
        this.Flights = new List<FlightRm>();
        this.LoadFlights();
    }

    private void LoadFlights()
    {
        this.Flights.Add(new FlightRm(
                   Guid.NewGuid(),
                   "United airline", this.Randomize.NextInt64(3000),
                   new TimePlaceRm("Ottawa", DateTime.Now),
                   new TimePlaceRm("kinshasa", DateTime.Now),
                   (int)this.Randomize.NextInt64(500)
                   ));

        this.Flights.Add(new FlightRm(
            Guid.NewGuid(),
            "Africa airline", this.Randomize.NextInt64(3000),
            new TimePlaceRm("Los angeles", DateTime.Now),
            new TimePlaceRm("Johannesburg", DateTime.Now),
             (int)this.Randomize.NextInt64(500)
            ));

        this.Flights.Add(new FlightRm(
        Guid.NewGuid(),
        "Wonderful airline", this.Randomize.NextInt64(3000),
        new TimePlaceRm("Minnesota", DateTime.Now),
        new TimePlaceRm("New Hampshire", DateTime.Now),
         (int)this.Randomize.NextInt64(500)
        ));
    }


    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    [ProducesResponseType(typeof(List<FlightRm>), 200)]
    [HttpGet(Name = "GetSearch")]
    public ActionResult<List<FlightRm>> Search()
    {
        return Ok(this.Flights);
    }


    [ProducesResponseType(404)]
    [ProducesResponseType(typeof(FlightRm), 200)]
    [HttpGet("{id}", Name = "GetSearchById")]
    public ActionResult<FlightRm> Find(Guid id)
    {
        var FoundFlight = this.Flights.SingleOrDefault(f => f.Id == id);

        if (FoundFlight == null) return NotFound();
        return Ok(FoundFlight);
    }

}
