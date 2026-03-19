export interface BookingResponse {
  success: boolean;
  error?: boolean;
  bookingId?: string;
  paymentUrl?: string;
  message?: string | string[];
  [key: string]: any;
}
