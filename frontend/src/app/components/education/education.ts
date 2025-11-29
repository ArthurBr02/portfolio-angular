import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';
import { TimelineItem } from '../shared/timeline-item/timeline-item';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-education',
    standalone: true,
    imports: [CommonModule, TimelineItem, TranslatePipe],
    templateUrl: './education.html',
    styleUrl: './education.css',
    encapsulation: ViewEncapsulation.None
})
export class Education {
    private educationService = inject(EducationService);

    protected readonly education = this.educationService.getEducation;
}
