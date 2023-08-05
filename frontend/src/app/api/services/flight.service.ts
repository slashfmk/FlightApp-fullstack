import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightRm } from '../models/flight-rm';
import { IBookDto } from '../models/IBookDto';
import { ISearchParams } from '../models/ISearchParams';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  // attributes
  private apiUrl = 'http://localhost:5165';

  constructor(private http: HttpClient) {}

  // * Read flights -- completed
  getFlights(params: ISearchParams): Observable<FlightRm[]> {
    return this.http.get<FlightRm[]>(this.apiUrl + '/Flight');
  }

  // * get single flight
  getFlight(id: string) {
    return this.http.get<FlightRm>(`${this.apiUrl}/Flight/${id}`);
  }

  // * create service
  createFlight(data: FlightRm) {
    return this.http.post<FlightRm>(this.apiUrl + '/Flight', { data });
  }

  // TODO Book flight
  bookFlight(data: IBookDto): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Booking`, data);
  }

  // TODO Get booking flights
  getBookedFlights(email: string): Observable<IBookDto[]> {
    return this.http.get<IBookDto[]>(`${this.apiUrl}/MyBookings/${email}`);
  }

  // Cancel booked flight
  cancelBooking(data: IBookDto): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/MyBooking`, data);
  }

  // get flights based on search args

}
