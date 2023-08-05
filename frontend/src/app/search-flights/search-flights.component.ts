import { Component, OnInit, inject } from '@angular/core';
import { FlightRm } from '../api/models/flight-rm';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { ISearchParams } from '../api/models/ISearchParams';

@Component({
  selector: 'app-search-flights',
  template: `
    <div class="flex flex-col px-6">
      <h5 class="text-center text-2xl">Search flights</h5>

      <form [formGroup]="searchForm" (ngSubmit)="search()">
        <div class="flex flex-row justify-between gap-8 w-full m-6">
          <input
            type="text"
            name="from"
            placeholder="From"
            formControlName="from"
            class="p-4 w-full border-solid border-2"
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            formControlName="to"
            class="p-4 w-full border-solid border-2"
          />
        </div>

        <div class="flex flex-row justify-between gap-8 w-full m-6">
          <input
            type="date"
            name="fromdate"
            placeholder="From"
            formControlName="fromDate"
            class="p-4 w-full border-solid border-2"
          />
          <input
            type="date"
            name="todate"
            placeholder="To"
            formControlName="toDate"
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
              formControlName="numberOfPassengers"
              class="p-4 w-full border-solid border-2"
            />
            <button class="bg-blue-700 text-white w-28" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>

      <div *ngFor="let flight of searchResult">
        <app-card
          airline="{{ flight.airline }}"
          [remainingSeats]="flight.remainingSeats ?? 0"
          [isLoggedIn]="userExists"
          departureTime="{{ flight.departure?.time }}"
          departurePlace="{{ flight.departure?.place }}"
          arrivalTime="{{ flight.departure?.time }}"
          arrivalPlace="{{ flight.arrival?.place }}"
          flightId="{{ flight.id }}"
          [price]="flight.price ?? 0"
        ></app-card>
      </div>

    </div>
  `,
  // providers: [FlightService],
})
export class SearchFlightsComponent implements OnInit {
  private flightService = inject(FlightService);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  searchResult: FlightRm[] = [];
  isLoading: boolean = false;

  searchForm = this.formBuilder.group({
    from: [''],
    to: [''],
    fromDate: [''],
    toDate: [''],
    numberOfPassengers: 1,
  });

  ngOnInit(): void {}

  constructor() {}

  public search() {
    this.isLoading = true;

    this.flightService
      .getFlights(this.searchForm.value as ISearchParams)
      .subscribe((response: FlightRm[]) => (this.searchResult = response));

    this.isLoading = false;
  }

  public get userExists(): boolean {
    return this.authService.currentUser !== undefined;
  }
}
