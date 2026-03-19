import { Seat } from './seat.model';

export interface TravelSeatsResponse {
  travelId: string;
  seats: Seat[];
  [key: string]: any;
}
