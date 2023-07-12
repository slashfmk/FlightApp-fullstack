using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public record NewPassengerDto(
        string Email,
        string FirstName,
        string LastName,
        bool IsFemale);
}