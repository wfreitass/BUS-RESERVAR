import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { CtaBannerComponent } from './cta-banner/cta-banner.component';
import { PartnerCompaniesComponent } from './partner-companies/partner-companies.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';

@Component({
  selector: 'qp-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroSearchComponent, 
    BenefitsComponent, 
    CtaBannerComponent, 
    PartnerCompaniesComponent, 
    PopularDestinationsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
