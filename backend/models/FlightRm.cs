using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.models
{
    public record FlightRm(
        Guid Id,
        string Airline,
        double Price,
        TimePlaceRm Departure,
        TimePlaceRm Arrival,
        int RemainingSeats
    );
}