export interface SearchResponse {
  id: string;
  company: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  [key: string]: any; 
}
