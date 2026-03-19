import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TicketSearchService } from '../../services/ticket-search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'qp-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  @Input() travelId: string = '';
  
  seatMap: any[] = [];
  loading: boolean = false;
  selectedSeats: string[] = [];

  constructor(private ticketService: TicketSearchService, private router: Router) { }

  ngOnInit(): void {
    if (this.travelId) {
      this.fetchSeats();
    }
  }

  fetchSeats(): void {
    this.loading = true;
    this.ticketService.getSeats(this.travelId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.seatMap = data[0].seats;
          console.log('Mapa de assentos:', this.seatMap);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar assentos', err);
        this.loading = false;
      }
    });
  }

  toggleSeat(seatObj: any): void {
    if (!seatObj || seatObj.occupied || !seatObj.seat || seatObj.type !== 'seat') return;

    const seatId = seatObj.seat;
    const index = this.selectedSeats.indexOf(seatId);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      if (this.selectedSeats.length < 5) {
        this.selectedSeats.push(seatId);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Limite atingido',
          text: 'Você pode selecionar no máximo 5 assentos por vez.',
          confirmButtonColor: '#ff6600'
        });
      }
    }
  }

  isSelected(seatId: string): boolean {
    return this.selectedSeats.includes(seatId);
  }

  isOccupied(seatObj: any): boolean {
    return seatObj && seatObj.occupied === true;
  }

  confirmSelection(): void {
    if (this.selectedSeats.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Selecione uma poltrona',
        text: 'Por favor, escolha pelo menos um assento para prosseguir.',
        confirmButtonColor: '#003366'
      });
      return;
    }

    const seatsList = this.selectedSeats.join(', ');
    
    Swal.fire({
      title: '<strong>Reserva Confirmada!</strong>',
      icon: 'success',
      html: `
        <div style="text-align: left; background: #f8f9fa; border: 2px dashed #003366; padding: 20px; border-radius: 10px; font-family: 'Inter', sans-serif;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #dee2e6; padding-bottom: 10px; margin-bottom: 10px;">
            <span style="font-weight: 800; color: #003366; text-transform: uppercase;">Passagem de Ônibus</span>
            <span style="color: #ff6600; font-weight: 700;">#CONFIRMADO</span>
          </div>
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; font-size: 12px; color: #6c757d; text-transform: uppercase;">Poltrona(s)</p>
            <p style="margin: 0; font-size: 20px; font-weight: 800; color: #343a40;">${seatsList}</p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <p style="margin: 0; font-size: 12px; color: #6c757d; text-transform: uppercase;">Status</p>
              <p style="margin: 0; font-weight: 700; color: #28a745;">Pronto para embarque</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; font-size: 12px; color: #6c757d; text-transform: uppercase;">Tipo</p>
              <p style="margin: 0; font-weight: 700;">Somente Ida</p>
            </div>
          </div>
          <div style="margin-top: 20px; text-align: center; border-top: 1px dashed #003366; pt: 10px;">
            <p style="font-size: 11px; color: #6c757d; margin-top: 10px;">Boa viagem com a Quero Passagem!</p>
          </div>
        </div>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> TUDO CERTO!',
      confirmButtonAriaLabel: 'Tudo certo!',
      confirmButtonColor: '#003366'
    }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
