export interface PassengerRequest {
  name: string;
  travelDocument: string;
  travelDocumentType: string;
  seatNumber: string;
  birthDate: string;
}

export interface TravelBookingRequest {
  travelId: string;
  passengers: PassengerRequest[];
}

export interface BookingRequest {
  travels: TravelBookingRequest[];
}
