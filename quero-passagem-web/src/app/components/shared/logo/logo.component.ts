import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'qp-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a routerLink="/" class="logo-link d-inline-block text-decoration-none">
      <img [src]="src" [alt]="alt" [style.height.px]="height" class="logo-img">
    </a>
  `,
  styles: [`
    .logo-link {
      transition: opacity 0.2s;
      &:hover { opacity: 0.9; }
    }
    .logo-img {
      max-width: 100%;
      object-fit: contain;
    }
  `]
})
export class LogoComponent {
  @Input() height: number = 40;
  @Input() src: string = 'https://assets.queropassagem.com.br/static/Images/Logos/logo_nova_grande.png';
  @Input() alt: string = 'Quero Passagem';
}
