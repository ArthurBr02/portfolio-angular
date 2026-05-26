import * as analyticsModel from '../models/analyticsModel';

export function trackView(path: string, userAgent: string, ipHash: string): void {
  analyticsModel.recordPageView(path, userAgent, ipHash);
}

export function getDashboardStats(): { totalViews: number; recentViews: { date: string; count: number }[] } {
  return {
    totalViews: analyticsModel.getTotalViews(),
    recentViews: analyticsModel.getVisitsLastDays(7) // Last 7 days
  };
}
