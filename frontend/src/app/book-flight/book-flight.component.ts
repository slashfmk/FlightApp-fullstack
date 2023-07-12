import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../api/services/flight.service';
import { FlightRm } from '../api/models/flight-rm';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit {
  flightId: string = 'Not loaded';
  foundFlight: FlightRm = {};
  errorStatus: number = 200;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pr) => this.findFlight(pr.get('flightId')));
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
}
