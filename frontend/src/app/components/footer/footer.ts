import { Component, inject, ViewEncapsulation } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  encapsulation: ViewEncapsulation.None
})
export class Footer {
  private portfolioService = inject(PortfolioService);
  protected readonly personalInfo = this.portfolioService.getPersonalInfo;
  protected readonly currentYear = new Date().getFullYear();
}
