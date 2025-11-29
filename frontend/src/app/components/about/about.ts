import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
  encapsulation: ViewEncapsulation.None
})
export class About {
  private portfolioService = inject(PortfolioService);

  protected readonly personalInfo = this.portfolioService.getPersonalInfo;
}
