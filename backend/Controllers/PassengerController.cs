using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using backend.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PassengerController : ControllerBase
    {

        static private List<NewPassengerDto> Passengers = new ();

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<string> Register(NewPassengerDto newPassengerDto)
        {
            Passengers.Add(newPassengerDto);
            System.Diagnostics.Debug.WriteLine(Passengers.Count);
            return Created("Passenger created successfully", newPassengerDto);
        }

        [HttpGet]
        public ActionResult<List<NewPassengerDto>> GetAll()
        {
            return Ok(Passengers);
        }

        [HttpGet("{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<List<NewPassengerDto>> GetPassenger(string email)
        {
            var PassengerFound = Passengers.FirstOrDefault(p => p.Email == email);

            if (PassengerFound == null)
            {
                return NotFound();
            }
            return Ok(PassengerFound);
        }
    }
}
