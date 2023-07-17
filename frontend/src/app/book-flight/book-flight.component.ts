import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightRm } from '../api/models/flight-rm';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';
import { IBookDto } from '../api/models/IBookDto';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit {

  foundFlight: FlightRm = {};
  errorStatus: number = 200;

  @Input() flightId = '';

  constructor(
    private flightService: FlightService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.flightId);
  }

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


  bookFlight() {
    // prepare the booking for the user
    const userDto: IBookDto = {
      PassengerEmail: this.authService.currentUser?.email ?? '',
      FlightId: this.flightId,
      NumberOfSeats: 1,
    };

    // Booking happens here
    this.flightService.bookFlight(userDto).subscribe(
      (response) => console.log('Booking saved successfully'),
      (error) => console.log(error)
    );

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
