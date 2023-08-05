using System.ComponentModel;

namespace backend.Dtos
{
    public record FlightSearchParameters 
        (

        [DefaultValue ("12/25/2023 10:30:00 AM")]
        DateTime? fromDate,

        [DefaultValue ("12/27/2023 10:30:00 AM")]
        DateTime? toDate,

        [DefaultValue("Los Angeles")]
        string? from,

        [DefaultValue("New York")]
        string? to,

        [DefaultValue(1)]
        int? NumberOfPassengers
        );

}
