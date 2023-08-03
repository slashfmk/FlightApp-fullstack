import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bookingRm } from '../models/booking-rm';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService implements OnInit {

  // imports
  private apiUrl = 'http://localhost:5165/booking';
  private http = inject(HttpClient);

  constructor() {}

  ngOnInit(): void {
  }

  // Get booked flight of a specific user
  getMyBookings(email: string) : Observable<bookingRm[]> {
    return this.http.get<bookingRm[]>(`${this.apiUrl}/${email}`);
  }

  // Cancel booking



}
