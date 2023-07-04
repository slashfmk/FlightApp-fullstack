import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightRm } from '../models/flight-rm';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  // attributes
  private apiUrl = 'http://localhost:5165/Flight';

  constructor(private http: HttpClient) {}

  // * Read flights -- completed
  getFlights(): Observable<FlightRm[]> {
    return this.http.get<FlightRm[]>(this.apiUrl);
  }

  // TODO create service
  createFlight(data: FlightRm) {
    return this.http.post<FlightRm>(this.apiUrl, { data });
  }

  // TODO Update flights

  // TODO Delete flight
}
