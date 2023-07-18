import { Component, OnInit, inject } from '@angular/core';
import { FlightRm } from '../api/models/flight-rm';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  providers: [FlightService],
})
export class SearchFlightsComponent implements OnInit {
  searchResult: FlightRm[] = [];
  isLoading: boolean = false;

  private flightService = inject(FlightService);
  private authService = inject(AuthService);

  ngOnInit(): void {}

  constructor() {}

  public search() {
    this.isLoading = true;

    this.flightService
      .getFlights()
      .subscribe((response: FlightRm[]) => (this.searchResult = response));

    this.isLoading = false;
  }

  public userExists() {
    return this.authService.currentUser;
  }

  // Create a new flight
  public createFlight() {
    // Entry to add flight
    const flight: FlightRm = {
      price: 452.22,
      remainingSeats: 455,
      airline: 'lufthansa',
      arrival: { place: 'Russia', time: Date.now().toString() },
      departure: { place: 'Brazzaville', time: Date.now().toString() },
      id: '445484ded84dc48ce8ec4c',
    };

    this.flightService
      .createFlight(flight)
      .subscribe((response) => console.log(response));
  }
}
