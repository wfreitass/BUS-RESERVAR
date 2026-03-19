import { SeatStatus } from './seat-status.enum';

export interface Seat {
  id: string;
  name: string;
  status: SeatStatus;
  price?: number;
}
