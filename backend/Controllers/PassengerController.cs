using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using backend.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;
using backend.Domain.Entities;

namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PassengerController : ControllerBase
    {

        static private List<Passenger> Passengers = new ();

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<string> Register(PassengerDto dto)
        {
            Passengers.Add(new Passenger(
                dto.Email,
                dto.FirstName,
                dto.LastName,
                dto.IsFemale
            ));

            // System.Diagnostics.Debug.WriteLine(Passengers.Count);
            return Created("Passenger created successfully", dto);
        }

        [HttpGet] 
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<List<PassengerDto>> GetAll()
        {
            return Ok(Passengers);
        }

        [HttpGet("{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<List<PassengerDto>> GetPassenger(string email)
        {
            var PassengerFound = Passengers.FirstOrDefault(p => p.Email == email);

            if (PassengerFound is null) return NotFound();

            return Ok(PassengerFound);
        }
    }
}
