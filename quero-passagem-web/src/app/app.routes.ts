import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Quero Passagem - Passagens de Ônibus'
  },
  {
    path: 'search',
    loadComponent: () => import('./components/search-results/search-results.component').then(m => m.SearchResultsComponent),
    title: 'Resultados da Busca - Quero Passagem'
  },
  {
    path: 'seats',
    loadComponent: () => import('./components/seat-selection/seat-selection.component').then(m => m.SeatSelectionComponent),
    title: 'Seleção de Assentos - Quero Passagem'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
