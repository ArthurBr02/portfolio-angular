import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience.service';
import { TimelineItem } from '../shared/timeline-item/timeline-item';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, TimelineItem],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
  encapsulation: ViewEncapsulation.None
})
export class Experience {
  private experienceService = inject(ExperienceService);

  protected readonly experiences = this.experienceService.getExperiences;
}
