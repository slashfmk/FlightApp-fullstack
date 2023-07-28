using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Entities;

namespace backend.Data
{
    public class Entities
    {

        static Random Randomize = new Random();

        public  List<Passenger> Passengers = new();

        public  List<Booking> bookings = new();

        public  List<Flight> Flights = new List<Flight> {

        new Flight(
                   Guid.NewGuid(),
                   "United airline", Randomize.NextInt64(3000),
                   new TimePlace("Ottawa", DateTime.Now),
                   new TimePlace("kinshasa", DateTime.Now),
                   20
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

    }
}