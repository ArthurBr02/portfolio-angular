import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PortfolioService } from '../../services/portfolio.service';
import { environment } from '../../../environments/environment';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  encapsulation: ViewEncapsulation.None
})
export class Skills {
  private portfolioService = inject(PortfolioService);
  private sanitizer = inject(DomSanitizer);

  protected readonly skillCategories = this.portfolioService.getSkillCategories;

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getIconUrl(categoryId: number | undefined): string {
    if (!categoryId) return '';
    return `${environment.apiUrl}/skill-categories/${categoryId}/icon`;
  }
}
