import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FlightRm } from '../api/models/flight-rm';
import { FlightService } from '../api/services/flight.service';
import { AuthService } from '../auth/auth.service';
import { IBookDto } from '../api/models/IBookDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit {
  foundFlight: FlightRm = {};
  errorStatus: number = 200;

  //private router = inject(Router);
  private flightService = inject(FlightService);
  private authService = inject(AuthService);

  formBuilder = inject(FormBuilder);

  @Input() flightId = '';

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
      PassengerEmail: this.authService.currentUser?.email ?? '',
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
