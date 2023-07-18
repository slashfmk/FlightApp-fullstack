using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public record NewPassengerDto(
        [Required]
        [EmailAddress]
        string Email,
        [Required]
        string FirstName,
        [Required]
        string LastName,
        [Required]
        bool IsFemale);
}