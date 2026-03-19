import { Component } from '@angular/core';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'qp-footer',
  standalone: true,
  imports: [ LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
