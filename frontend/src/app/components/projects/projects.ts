import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  encapsulation: ViewEncapsulation.None
})
export class Projects {
  private projectService = inject(ProjectService);

  protected readonly projects = this.projectService.getProjects;
}
