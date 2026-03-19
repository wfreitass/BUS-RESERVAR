export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  paymentUrl?: string;
  message?: string;
  [key: string]: any;
}
