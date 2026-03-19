import { Component } from '@angular/core';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'qp-header',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
