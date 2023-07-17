import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPassenger } from '../models/IPassenger';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {

  private apiUrl: string = 'http://localhost:5165/passenger';

  constructor(private http: HttpClient) {}

  // Create a new passenger
  createPassenger(passenger: IPassenger): Observable<any> {
    return this.http.post<IPassenger>(this.apiUrl, passenger);
  }

  // Get all the passengers
  getPassengers(): Observable<IPassenger[]> {
    return this.http.get<IPassenger[]>(this.apiUrl);
  }

  // Get a specific passenger
  getPassenger(email: string): Observable<IPassenger> {
    return this.http.get<IPassenger>(`${this.apiUrl}/${email}`);
  }
}
