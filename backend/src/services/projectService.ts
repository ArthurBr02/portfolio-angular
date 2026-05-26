import * as projectModel from '../models/projectModel';
import { createError } from '../middleware/errorHandler';

export function getAllProjects(): projectModel.Project[] {
  return projectModel.getAllProjects();
}

export function getProjectById(id: number): projectModel.Project {
  const project = projectModel.getProjectById(id);
  if (!project) {
    throw createError('Project not found', 404);
  }
  return project;
}

export function createProject(data: Omit<projectModel.Project, 'id' | 'created_at' | 'updated_at' | 'images'>): projectModel.Project {
  return projectModel.createProject(data);
}

export function updateProject(id: number, data: Partial<Omit<projectModel.Project, 'id' | 'created_at' | 'updated_at' | 'images'>>): projectModel.Project {
  const project = projectModel.updateProject(id, data);
  if (!project) {
    throw createError('Project not found', 404);
  }
  return project;
}

export function deleteProject(id: number): void {
  const success = projectModel.deleteProject(id);
  if (!success) {
    throw createError('Project not found', 404);
  }
}

// Images
export function addProjectImage(projectId: number, imageUrl: string, sortOrder: number = 0): projectModel.ProjectImage {
    // verify project exists
    getProjectById(projectId);
    return projectModel.addProjectImage(projectId, imageUrl, sortOrder);
}

export function deleteProjectImage(imageId: number): void {
    const success = projectModel.deleteProjectImage(imageId);
    if (!success) {
        throw createError('Project image not found', 404);
    }
}

export function updateProjectImagesOrder(updates: {id: number, sort_order: number}[]): void {
    projectModel.updateProjectImagesOrder(updates);
}
