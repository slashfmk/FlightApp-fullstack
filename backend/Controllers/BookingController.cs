using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {

        private readonly Entities _entities;

        public BookingController(Entities Entities)
        {
            this._entities = Entities;
        }

        [HttpGet("{email}")]
        [ProducesResponseType(500)]
        [ProducesResponseType(typeof(List<BookingRm>), 200)]
        [ProducesResponseType(400)]
        public ActionResult<List<BookingRm>> List(string email)
        {
            var Bookings = this._entities.Flights
            .ToArray()
            .SelectMany(f => f.Bookings.Where(b => b.PassengerEmail == email)
            .Select(b => new BookingRm(
                f.Id,
                f.Airline,
                f.Price,
                new TimePlaceRm(f.Arrival.Place, f.Arrival.Time),
                new TimePlaceRm(f.Departure.Place, f.Departure.Time),
                b.NumberOfSeats,
                email
            )));

            return Ok(Bookings);
        }
    }
}