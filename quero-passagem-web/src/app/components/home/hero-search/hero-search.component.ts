import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketSearchService } from '../../../services/ticket-search.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'qp-hero-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss'
})
export class HeroSearchComponent {
  filteredOrigins: any[] = [];
  filteredDestinations: any[] = [];
  
  originQuery: string = '';
  destinationQuery: string = '';
  departureDate: string = '';
  minDate: string = new Date().toISOString().split('T')[0];
  
  selectedOrigin: any = null;
  selectedDestination: any = null;
  
  showOriginDropdown: boolean = false;
  showDestinationDropdown: boolean = false;

  private originSubject = new Subject<string>();
  private destinationSubject = new Subject<string>();

  constructor(
    private ticketService: TicketSearchService,
    private router: Router
  ) {
    this.originSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        console.log('Buscando origem permitida:', query);
        return this.ticketService.getAllowedLocations(query).pipe(
          catchError(err => {
            console.error('Erro na busca de origem', err);
            return of([]);
          })
        );
      })
    ).subscribe(data => {
      console.log('Resultados de origem:', data);
      this.filteredOrigins = data;
      this.showOriginDropdown = this.filteredOrigins.length > 0;
    });

    this.destinationSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        console.log('Buscando destino permitido:', query);
        return this.ticketService.getAllowedLocations(query).pipe(
          catchError(err => {
            console.error('Erro na busca de destino', err);
            return of([]);
          })
        );
      })
    ).subscribe(data => {
      console.log('Resultados de destino:', data);
      this.filteredDestinations = data;
      this.showDestinationDropdown = this.filteredDestinations.length > 0;
    });
  }

  filterOrigins(): void {
    if (!this.originQuery || this.originQuery.trim().length === 0) {
      this.showOriginDropdown = false;
      this.selectedOrigin = null;
      return;
    }
    console.log('Disparando originSubject para:', this.originQuery);
    this.originSubject.next(this.originQuery);
  }

  filterDestinations(): void {
    if (!this.destinationQuery || this.destinationQuery.trim().length === 0) {
      this.showDestinationDropdown = false;
      this.selectedDestination = null;
      return;
    }
    console.log('Disparando destinationSubject para:', this.destinationQuery);
    this.destinationSubject.next(this.destinationQuery);
  }

  selectOrigin(loc: any): void {
    this.selectedOrigin = loc;
    this.originQuery = loc.name;
    this.showOriginDropdown = false;
  }

  selectDestination(loc: any): void {
    this.selectedDestination = loc;
    this.destinationQuery = loc.name;
    this.showDestinationDropdown = false;
  }

  clearInput(field: 'origin' | 'destination'): void {
    if (field === 'origin') {
      this.originQuery = '';
      this.selectedOrigin = null;
      this.showOriginDropdown = false;
    } else {
      this.destinationQuery = '';
      this.selectedDestination = null;
      this.showDestinationDropdown = false;
    }
  }

  getUF(name: string): string {
    const parts = name.split(',');
    if (parts.length > 1) {
      return parts[1].trim().substring(0, 2).toUpperCase();
    }
    return '';
  }

  onSearch(event: Event): void {
    event.preventDefault();
    
    if (!this.selectedOrigin || !this.selectedDestination || !this.departureDate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const originState = this.getStateFromName(this.selectedOrigin.name);
    const destinationState = this.getStateFromName(this.selectedDestination.name);

    if (!this.isStateAllowed(originState) || !this.isStateAllowed(destinationState)) {
      alert('Busca permitida somente para cidades e rodoviárias de SP e PR.');
      return;
    }

    this.router.navigate(['/search'], {
      queryParams: {
        originId: this.selectedOrigin.id,
        destinationId: this.selectedDestination.id,
        originState: originState,
        destinationState: destinationState,
        date: this.departureDate
      }
    });
  }

  private getStateFromName(name: string): string {
    const parts = name.split(',');
    if (parts.length > 1) {
      const statePart = parts[1].trim().substring(0, 2);
      return statePart.toUpperCase();
    }
    return '';
  }

  private isStateAllowed(state: string): boolean {
    return ['SP', 'PR'].includes(state);
  }
}
