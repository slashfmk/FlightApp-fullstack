
namespace backend.Domain.Entities
{
    public class TimePlace
    {

        public string Place { get; set; }
        public DateTime Time { get; set; }

        public TimePlace ()
        {

        }
        
        public TimePlace(string Place, DateTime Time)
        {
            this.Place = Place;
            this.Time = Time;
        }
    }
}