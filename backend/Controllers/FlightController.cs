using backend.models;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FlightController : ControllerBase
{

    private readonly ILogger<FlightController> _logger;

    private readonly List<FlightRm> Flights;

    private Random random = new Random();

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
                   "United airline", this.random.NextInt64(3000),
                   new TimePlaceRm("Ottawa", DateTime.Now),
                   new TimePlaceRm("kinshasa", DateTime.Now),
                   (int)this.random.NextInt64(500)
                   ));

        this.Flights.Add(new FlightRm(
            Guid.NewGuid(),
            "Africa airline", this.random.NextInt64(3000),
            new TimePlaceRm("Los angeles", DateTime.Now),
            new TimePlaceRm("Johannesburg", DateTime.Now),
             (int)this.random.NextInt64(500)
            ));
    }

    [HttpGet(Name = "GetSearch")]
    public ActionResult<List<FlightRm>> Search()
    {
        return Ok(this.Flights);
    }

    [HttpGet("{id}")]
    public ActionResult<FlightRm> GetFlight(Guid id)
    {
        return Ok(this.Flights.Find(f => f.Id == id));
    }

}
