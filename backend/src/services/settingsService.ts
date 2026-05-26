import * as settingsModel from '../models/settingsModel';

export function getAllSettings(): Record<string, string> {
  return settingsModel.getAllSettings();
}

export function updateSettings(updates: Record<string, string>): Record<string, string> {
  settingsModel.updateSettings(updates);
  return getAllSettings();
}

export function isSectionEnabled(sectionName: string): boolean {
   const val = settingsModel.getSetting(`section_${sectionName}_enabled`);
   return val === 'true';
}
