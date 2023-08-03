import { Component, Input, OnInit } from '@angular/core';
import { FlightRm } from '../api/models/flight-rm';

@Component({
  selector: 'app-card',
  template: `
    <div class="grid grid-rows-2 bg-slate-300 my-2 p-4 ">
      <h3 class="text-2xl text-blue-600 text-center">{{ airline }}</h3>
      <h4 class="text-center">Remaining seats: {{ remainingSeats }}</h4>

      <div class="grid grid-cols-3">
        <div>
          <p>{{ departurePlace }}</p>
          <p>{{ departureTime | date }}</p>
          <p>{{ departureTime | date : 'shortTime' }}</p>
        </div>

        <div>
          <h3>{{price}}</h3>
          <button *ngIf="isLoggedIn" [routerLink]="['/book-flights/', flightId]" class="bg-slate-700 text-slate-400 p-3 rounded-md">Book</button>
          <button *ngIf="!isLoggedIn" [routerLink]="['/register-passenger']" class="bg-slate-700 text-slate-400 p-3 rounded-md">Book</button>
        </div>

        <div>
          <p>{{ arrivalPlace }}</p>
          <p>{{ arrivalTime | date }}</p>
          <p>{{ arrivalTime | date : 'shortTime' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CardComponent implements OnInit {

  // Component inputs
  @Input() airline: string = '';
  @Input() departureTime: string = '';
  @Input() departurePlace: string = '';

  @Input() arrivalTime: string = '';
  @Input() arrivalPlace: string = '';

  @Input() isLoggedIn: boolean = false;

  @Input() price: number = 0;
  @Input() remainingSeats: number = 0;

  @Input() flightId: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(`flight id is: ${this.flightId}`);
  }



}
