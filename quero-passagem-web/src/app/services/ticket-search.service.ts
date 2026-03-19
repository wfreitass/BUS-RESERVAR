import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  LocationResponse, 
  SearchRequest, 
  SearchResponse, 
  TravelSeatsResponse, 
  BookingRequest, 
  BookingResponse 
} from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketSearchService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLocations(query: string = ''): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(`${this.apiUrl}/locations`, {
      params: query ? { query } : {}
    });
  }

  getAllowedLocations(query: string = ''): Observable<LocationResponse[]> {
    return this.http.get<LocationResponse[]>(`${this.apiUrl}/locations/allowed`, {
      params: query ? { query } : {}
    });
  }

  search(searchData: SearchRequest): Observable<SearchResponse[]> {
    return this.http.post<SearchResponse[]>(`${this.apiUrl}/search`, searchData);
  }

  getSeats(travelId: string): Observable<TravelSeatsResponse[]> {
    return this.http.get<TravelSeatsResponse[]>(`${this.apiUrl}/seats/${travelId}`);
  }

  createBooking(bookingData: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.apiUrl}/booking`, bookingData);
  }
}
