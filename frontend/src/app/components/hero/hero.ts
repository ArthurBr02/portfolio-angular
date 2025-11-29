import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  encapsulation: ViewEncapsulation.None
})
export class Hero {
  private portfolioService = inject(PortfolioService);

  protected readonly personalInfo = this.portfolioService.getPersonalInfo;
}
