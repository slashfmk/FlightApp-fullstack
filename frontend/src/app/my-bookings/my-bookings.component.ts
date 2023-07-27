import { Component, OnInit, inject } from '@angular/core';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';
import { IBookDto } from '../api/models/IBookDto';

@Component({
  selector: 'app-my-bookings',
  template: `
    <h1 *ngIf="currentUserEmail">Bookings for user: {{ currentUserEmail }}</h1>
    <h2 class="text-3xl font-light py-4">List of booked flights:</h2>
    <div *ngFor="let booking of bookingItems">
      <p>{{ booking.PassengerEmail }}</p>
    </div>
  `,
  styles: [],
})
export class MyBookingsComponent implements OnInit {
  private flightService = inject(FlightService);
  private authService = inject(AuthService);
  currentUserEmail = '';
  bookingItems: IBookDto[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.currentUserEmail = this.authService.currentUser?.email as string;
    if (!this.currentUserEmail) return;

    this.flightService.getBookedFlights(this.currentUserEmail).subscribe(
      (bookings) => {
        this.bookingItems = bookings;
        console.log(bookings);
      },
      (error) => console.log(error)
    );
  }
}
