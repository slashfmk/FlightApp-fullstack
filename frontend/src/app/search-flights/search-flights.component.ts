import { Component, OnInit, inject } from '@angular/core';
import { FlightRm } from '../api/models/flight-rm';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-search-flights',
  template: `
    <div class="flex flex-col px-6">
      <h5 class="text-center text-2xl">Search flights</h5>

      <div class="flex flex-row justify-between gap-8 w-full m-6">
        <input
          type="text"
          name="from"
          placeholder="From"
          class="p-4 w-full border-solid border-2"
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          class="p-4 w-full border-solid border-2"
        />
      </div>

      <div class="flex flex-row justify-between gap-8 w-full m-6">
        <input
          type="date"
          name="fromdate"
          placeholder="From"
          class="p-4 w-full border-solid border-2"
        />
        <input
          type="date"
          name="todate"
          placeholder="To"
          class="p-4 w-full border-solid border-2"
        />
      </div>

      <div class="flex flex-cols gap-5">
        <label for="passengers" class="text-right self-center w-full"
          >Number of Passengers</label
        >

        <div class="flex flex-cols gap-2 w-full justify-end">
          <input
            type="number"
            name="pnumber"
            placeholder="# passengers"
            class="p-4 w-full border-solid border-2"
          />
          <button (click)="search()" class="bg-blue-700 text-white w-28">
            Submit
          </button>
        </div>
      </div>

      <div *ngFor="let flight of searchResult">
        <app-card
          airline="{{ flight.airline }}"
          [remainingSeats]="flight.remainingSeats ?? 0"
          [isLoggedIn]="userExists"
          departureTime="{{ flight.departure?.time }}"
          departurePlace="{{ flight.departure?.place }}"
          arrivalTime="{{ flight.departure?.time }}"
          arrivalPlace="{{ flight.arrival?.place }}"
          flightId={{flight.id}}
          [price]="flight.price ?? 0"
        ></app-card>
      </div>
    </div>
  `,
  // providers: [FlightService],
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

  public get userExists(): boolean {
    return this.authService.currentUser !== undefined;
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
