import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private apiUrl: string = 'localhost:3000/passenger';

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
  getPassenger(id: string): Observable<IPassenger> {
    return this.http.get<IPassenger>(`${this.apiUrl}/${id}`);
  }
}

export interface IPassenger {
  firstName: string;
  lastName: string;
  email: string;
  isFemale: boolean;
}
