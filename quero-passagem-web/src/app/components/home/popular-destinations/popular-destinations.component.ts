import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'qp-popular-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-destinations.component.html',
  styleUrl: './popular-destinations.component.scss'
})
export class PopularDestinationsComponent {
  destinations = [
    {
      routeOrigin: 'SÃO PAULO',
      routeDest: 'RIO DE JANEIRO',
      title: 'São Paulo para Rio de Janeiro',
      price: '89,90',
      image: 'https://assets.queropassagem.com.br/public/Upload/cidades/57a.jpg'
    },
    {
      routeOrigin: 'SÃO PAULO',
      routeDest: 'CURITIBA',
      title: 'São Paulo para Curitiba',
      price: '64,50',
      image: 'https://assets.queropassagem.com.br/public/Upload/cidades/55a.jpg'
    },
    {
      routeOrigin: 'BRASÍLIA',
      routeDest: 'GOIÂNIA',
      title: 'Brasília para Goiânia',
      price: '45,00',
      image: 'https://imgmd.net/images/v1/guia/4568814/goiania.jpg'
    },
    {
      routeOrigin: 'BELO HORIZONTE',
      routeDest: 'VITÓRIA',
      title: 'Belo Horizonte para Vitória',
      price: '112,00',
      image: 'https://b3577058.smushcdn.com/3577058/wp-content/uploads/2022/01/o-que-fazer-em-vitoria-720x511.jpeg?lossy=1&strip=0&webp=1'
    }
  ];
}
