using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class Entities : DbContext
    {

        static Random Randomize = new Random();
        public DbSet<Passenger> Passengers => Set<Passenger>();
         public DbSet<Booking> Bookings => Set<Booking>();
        public DbSet<Flight> Flights => Set<Flight>();

        public Entities(DbContextOptions<Entities> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Setting the primary key
            modelBuilder.Entity<Passenger>().HasKey(p => p.Email);

            // Prevent race condition for a field in a table
            // for this case prevent 2 people for booking the same number of seats when remaining
            modelBuilder.Entity<Flight>().Property(p => p.RemainingSeats).IsConcurrencyToken();

            // Register complex data type in a db
            modelBuilder.Entity<Flight>().OwnsOne(f => f.Departure);
            modelBuilder.Entity<Flight>().OwnsOne(f => f.Arrival);
            modelBuilder.Entity<Flight>().OwnsMany(f => f.Bookings);
        }

    }
}