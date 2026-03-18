import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeatSelectionComponent } from '../seat-selection/seat-selection.component';
import { TicketSearchService } from '../../services/ticket-search.service';

@Component({
  selector: 'qp-search-results',
  standalone: true,
  imports: [CommonModule, SeatSelectionComponent, RouterLink],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  originId: string = '';
  destinationId: string = '';
  originState: string = '';
  destinationState: string = '';
  date: string = '';
  
  tickets: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  
  // Controle do Accordion
  expandedTravelId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketSearchService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.originId = params['originId'];
      this.destinationId = params['destinationId'];
      this.originState = params['originState'];
      this.destinationState = params['destinationState'];
      this.date = params['date'];

      if (this.originId && this.destinationId && this.date) {
        this.performSearch();
      }
    });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

  performSearch(): void {
    this.loading = true;
    this.errorMessage = '';
    
    const searchData = {
      origin_id: this.originId,
      destination_id: this.destinationId,
      origin_state: this.originState,
      destination_state: this.destinationState,
      date: this.date
    };

    this.ticketService.search(searchData).subscribe({
      next: (data) => {
        this.tickets = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao buscar passagens.';
        this.loading = false;
      }
    });
  }

  toggleSeats(travelId: string): void {
    if (this.expandedTravelId === travelId) {
      this.expandedTravelId = null;
    } else {
      this.expandedTravelId = travelId;
    }
  }

  formatTime(dateTime: any): string {
    return dateTime?.time || '';
  }

  formatDate(dateTime: any): string {
    if (!dateTime?.date) return '';
    const date = new Date(dateTime.date);
    return date.toLocaleDateString('pt-BR');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  getCompanyLogo(company: any): string {
    if (!company?.name) return '';
    // Gera um slug simples: minúsculo, remove espaços, acentos e "viação"
    const slug = company.name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/viacao\s+/g, '')
      .replace(/\s+/g, '-');
    
    return `https://assets.queropassagem.com.br/public/Upload/autoviacao/viacao-${slug}.jpg`;
  }

  formatDuration(seconds: number): string {
    if (!seconds) return '';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
}
