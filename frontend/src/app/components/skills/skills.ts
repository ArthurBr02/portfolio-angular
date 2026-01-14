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
  protected readonly autonomyScale = [1, 2, 3, 4, 5] as const;

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getIconUrl(categoryId: number | undefined): string {
    if (!categoryId) return '';
    return `${environment.apiUrl}/skill-categories/${categoryId}/icon`;
  }

  autonomyLabel(level: number | null | undefined): string {
    if (!level) return '';
    switch (level) {
      case 1:
        return 'skills.autonomy.level1';
      case 2:
        return 'skills.autonomy.level2';
      case 3:
        return 'skills.autonomy.level3';
      case 4:
        return 'skills.autonomy.level4';
      case 5:
        return 'skills.autonomy.level5';
      default:
        return '';
    }
  }
}
