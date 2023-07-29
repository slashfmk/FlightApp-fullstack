
namespace backend.Domain.Entities
{
    public class Passenger
    {

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsFemale { get; set; }


        public Passenger()
        {
        }

        public Passenger(string Email, string FirstName, string LastName, bool IsFemale)
        {
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.IsFemale = IsFemale;
            this.Email = Email;
        }

    }
}