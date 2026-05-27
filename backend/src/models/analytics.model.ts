import { db } from '../config/database';

export function trackPageView(path: string, userAgent: string, ipHash: string): void {
  db.prepare('INSERT INTO page_views (path, user_agent, ip_hash) VALUES (?, ?, ?)').run(path, userAgent, ipHash);
}

export function getAnalytics(days: number): { date: string; count: number }[] {
  return db.prepare(`
    WITH RECURSIVE dates(d) AS (
      SELECT date('now', '-' || (? - 1) || ' days')
      UNION ALL
      SELECT date(d, '+1 day') FROM dates WHERE d < date('now')
    )
    SELECT d AS date, COALESCE(pv.count, 0) AS count
    FROM dates
    LEFT JOIN (
      SELECT date(created_at) AS d, COUNT(*) AS count
      FROM page_views
      WHERE created_at >= datetime('now', '-' || ? || ' days')
      GROUP BY date(created_at)
    ) pv ON pv.d = dates.d
    ORDER BY d ASC
  `).all(days, days) as { date: string; count: number }[];
}

export function getAnalyticsSummary() {
  const totalViews = (db.prepare('SELECT COUNT(*) as count FROM page_views').get() as { count: number }).count;
  return { totalViews };
}
