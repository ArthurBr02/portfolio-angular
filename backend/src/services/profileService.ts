import * as profileModel from '../models/profileModel';
import { createError } from '../middleware/errorHandler';

export function getProfile(): profileModel.Profile {
  const profile = profileModel.getProfile();
  if (!profile) {
    throw createError('Profile not found', 404);
  }
  return profile;
}

export function updateProfile(data: Partial<Omit<profileModel.Profile, 'id' | 'created_at' | 'updated_at'>>): profileModel.Profile {
  return profileModel.updateProfile(data);
}
