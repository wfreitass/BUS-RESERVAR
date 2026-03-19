export interface BookingRequest {
  travelId: string;
  seats: string[];
  passenger: {
    name: string;
    document: string;
    email: string;
  };
}
