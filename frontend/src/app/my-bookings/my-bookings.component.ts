import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { bookingRm } from '../api/models/booking-rm';
import { BookingService } from '../api/services/booking.service';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-bookings',
  template: `
    <h1 *ngIf="currentUserEmail">Bookings for user: {{ currentUserEmail }}</h1>
    <h2 class="text-3xl font-light py-4">List of booked flights:</h2>
    <div *ngFor="let booking of bookingItems">
      <app-card
        airline="{{ booking.airline }}"
        [remainingSeats]="booking.numberOfSeats"
        [isLoggedIn]="userExists"
        departureTime="{{ booking.departure.time }}"
        departurePlace="{{ booking.departure.place }}"
        arrivalTime="{{ booking.departure.time }}"
        arrivalPlace="{{ booking.arrival.place }}"
        [price]="booking.price"
      ></app-card>

      <button
        class="m-5 bg-yellow-500"
        (click)="cancelBooking(booking.id, booking.numberOfSeats)"
      >
        Cancel flight
      </button>
    </div>
  `,
})
export class MyBookingsComponent implements OnInit {
  private flightService = inject(FlightService);
  private authService = inject(AuthService);
  private bookingService = inject(BookingService);
  private router = inject(Router);

  currentUserEmail = '';
  bookingItems: bookingRm[] = [];

  constructor() {}

  ngOnInit(): void {
    if (!this.authService.currentUser) this.router.navigate(['/']);
    this.getBookings();
  }

  get userExists(): boolean {
    return this.authService.currentUser !== null;
  }

  // TODO cancel booking
  cancelBooking(bookingId: string, numberOfSeat: number): void {
    this.flightService
      .cancelBooking({
        FlightId: bookingId,
        PassengerEmail: this.currentUserEmail,
        NumberOfSeats: numberOfSeat,
      })
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  getBookings(): void {
    this.currentUserEmail = this.authService.currentUser?.email as string;
    if (!this.currentUserEmail) return;

    this.bookingService.getMyBookings(this.currentUserEmail).subscribe(
      (bookings) => {
        this.bookingItems = bookings;
        console.log(bookings);
      },
      (error) => console.log(error)
    );
  }
}
