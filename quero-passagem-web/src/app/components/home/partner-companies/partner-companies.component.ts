import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'qp-partner-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner-companies.component.html',
  styleUrl: './partner-companies.component.scss'
})
export class PartnerCompaniesComponent {
  partners = ['COMETA', '1001', 'GONTIJO', 'CATARINENSE', 'ÁGUIA BRANCA'];
}
