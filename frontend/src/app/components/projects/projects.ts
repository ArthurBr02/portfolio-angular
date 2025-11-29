import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  encapsulation: ViewEncapsulation.None
})
export class Projects {
  private projectService = inject(ProjectService);

  protected readonly projects = this.projectService.getProjects;
}
