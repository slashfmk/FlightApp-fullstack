import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBookDto } from '../api/models/IBookDto';
import { FlightRm } from '../api/models/flight-rm';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-book-flight',
  template: `
    <div
      *ngIf="errorStatus !== 200"
      class="p-8 bg-red-300 text-red-700 font-bold"
    >
      <h2>Flight with id : {{ flightId }} has not been found!</h2>
    </div>

    <h2>{{ flightId }} vvvvv</h2>

    <!-- Form validation UI -->
    <div
      *ngIf="seatNumber.invalid && (seatNumber.dirty || seatNumber.touched)"
      class="bg-red-200 text-red-800 p-6"
    >
      <div *ngIf="seatNumber.errors?.['required']">
        You must provide a number
      </div>
      <div *ngIf="seatNumber.errors?.['min']">
        You cannot book for less than 1 passenger
      </div>
      <div *ngIf="seatNumber.errors?.['max']">
        Our plan doesn't have more than 254 seats
      </div>
    </div>

    <form [formGroup]="form">
      <label for="">Number of seats to reserve: </label>
      <input
        formControlName="seats"
        [ngClass]="seatNumber.invalid ? 'border-red-600' : ''"
        id="seats"
        type="number"
        class="p-4 border-2 border-solid border-grey-700"
        placeholder="Number of seats"
      />
      <button class="p-3 bg-blue-500 text-white m-4" (click)="bookFlight()">
        Book
      </button>
    </form>
  `,
})
export class BookFlightComponent implements OnInit {
  foundFlight: FlightRm = {};
  errorStatus: number = 200;

  //private router = inject(Router);
  private flightService = inject(FlightService);
  private authService = inject(AuthService);

  formBuilder = inject(FormBuilder);

  @Input()
  flightId = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.flightId);
  }

  form = this.formBuilder.group({
    seats: [
      1,
      Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(254),
      ]),
    ],
  });

  private findFlight(flightId: string | null) {
    this.flightId = flightId ?? 'Not passed';

    this.flightService.getFlight(this.flightId).subscribe(
      (response) => (this.foundFlight = response),
      (err) => {
        this.errorStatus = err.status;
        if (err.status !== 200)
          setTimeout(() => this.router.navigate(['/search-flights']), 1000);
      }
    );
  }

  get seatNumber() {
    return this.form.controls.seats;
  }

  bookFlight() {
    // Check if the form is valid
    if (this.form.invalid) return;

    // prepare the booking for the user
    const userDto: IBookDto = {
      PassengerEmail: this.authService.currentUser?.email as string,
      FlightId: this.flightId,
      NumberOfSeats: this.form.get('seats')?.value ?? 0,
    };

    // Booking happens here
    this.flightService.bookFlight(userDto).subscribe(
      (response) => this.router.navigate(['/']),
      (error) => console.log(error)
    );
  }
}
