using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.models
{
    public record PassengerRm(
        string firstName,
        string lastName,
        string email,
        bool isFemale
    );
}