import { TimePlaceRm } from './time-place-rm';

export interface bookingRm extends TimePlaceRm {
  id: string;
  airline: string;
  price: number;
  departure: TimePlaceRm;
  arrival: TimePlaceRm;
  numberOfSeats: number;
  passengerEmail: string;
}
