using backend.Data;
using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

/**
* ? Add db context
* ? Connection info passed using Builder configuration string
* it's coming from appsettings.json
*/
builder.Services.AddDbContext<Entities>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("Flights")));


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//? Add the Entities as a singleton
builder.Services.AddScoped<Entities>();

var app = builder.Build();

/**
* ? Code to execute right after building the app
* ? by creating a ServiceScope after the app build()
*/
var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();

entities.Database.EnsureCreated();

var Randomize = new Random();

// check so we can seed once
if(!entities.Flights.Any())
{

Flight[] flightsToSeed = new Flight[]
{
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

    entities.Flights.AddRange(flightsToSeed);
    // Saving the seeding data to the db
    entities.SaveChanges();
    // # Pre-seeding end

}


// Cors setting
app.UseCors(builder => builder
.WithOrigins("*")
.AllowAnyMethod()
.AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
