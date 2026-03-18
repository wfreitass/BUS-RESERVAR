import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketSearchService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLocations(query: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/locations`, {
      params: query ? { query } : {}
    });
  }

  getAllowedLocations(query: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/locations/allowed`, {
      params: query ? { query } : {}
    });
  }

  search(searchData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/search`, searchData);
  }

  getSeats(travelId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/seats/${travelId}`);
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/booking`, bookingData);
  }
}
