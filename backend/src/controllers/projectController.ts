import { Request, Response, NextFunction } from 'express';
import * as projectService from '../services/projectService';

export function getAllProjects(req: Request, res: Response, next: NextFunction): void {
  try {
    const projects = projectService.getAllProjects();
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
}

export function getProjectById(req: Request, res: Response, next: NextFunction): void {
  try {
    const project = projectService.getProjectById(Number(req.params.id));
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export function createProject(req: Request, res: Response, next: NextFunction): void {
  try {
    // stringify technologies if provided as array
    if (Array.isArray(req.body.technologies)) {
        req.body.technologies = JSON.stringify(req.body.technologies);
    }
    const project = projectService.createProject(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export function updateProject(req: Request, res: Response, next: NextFunction): void {
  try {
     // stringify technologies if provided as array
    if (Array.isArray(req.body.technologies)) {
        req.body.technologies = JSON.stringify(req.body.technologies);
    }
    const project = projectService.updateProject(Number(req.params.id), req.body);
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export function deleteProject(req: Request, res: Response, next: NextFunction): void {
  try {
    projectService.deleteProject(Number(req.params.id));
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
}

export function addImage(req: Request, res: Response, next: NextFunction): void {
    try {
        const image = projectService.addProjectImage(Number(req.params.id), req.body.image_url, req.body.sort_order);
        res.status(201).json({ success: true, data: image });
    } catch (err) {
        next(err);
    }
}

export function deleteImage(req: Request, res: Response, next: NextFunction): void {
    try {
        projectService.deleteProjectImage(Number(req.params.imageId));
        res.json({ success: true, message: 'Image deleted' });
    } catch (err) {
        next(err);
    }
}
