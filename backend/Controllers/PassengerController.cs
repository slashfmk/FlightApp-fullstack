using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using backend.Dtos;
using Microsoft.AspNetCore.Http.HttpResults;
using backend.Domain.Entities;
using backend.Data;

namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PassengerController : ControllerBase
    {

        private readonly Entities _entities;

        public PassengerController(Entities entities)
        {
            _entities = entities;
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<string> Register(PassengerDto dto)
        {

            var PassengerToSave = new Passenger(
                dto.Email,
                dto.FirstName,
                dto.LastName,
                dto.IsFemale
            );

           // _entities.Passengers.Add(PassengerToSave);

            var exists = _entities.Passengers.Contains(PassengerToSave);

            if (exists) return Conflict(new { message = "Passenger exists already" });

            _entities.SaveChanges();

            return Created("Passenger created successfully", dto);
        }

        [HttpGet]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<List<PassengerDto>> GetAll()
        {
            return Ok(_entities.Passengers);
        }

        [HttpGet("{email}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<List<PassengerDto>> GetPassenger(string email)
        {
            var PassengerFound = _entities.Passengers.FirstOrDefault(p => p.Email == email);

            if (PassengerFound is null) return NotFound();

            return Ok(PassengerFound);
        }
    }
}
