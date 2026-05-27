import { db } from '../config/database';

export type AnalyticsPeriod = '1d' | '7d' | '30d' | '1y' | 'all';

export function trackPageView(path: string, userAgent: string, ipHash: string): void {
  db.prepare('INSERT INTO page_views (path, user_agent, ip_hash) VALUES (?, ?, ?)').run(path, userAgent, ipHash);
}

export function getAnalytics(period: AnalyticsPeriod): { date: string; count: number }[] {
  if (period === '1d') {
    const rows = db.prepare(`
      SELECT strftime('%H', created_at) AS h, COUNT(*) AS count
      FROM page_views
      WHERE date(created_at) = date('now')
      GROUP BY strftime('%H', created_at)
    `).all() as { h: string; count: number }[];
    const byHour = new Map(rows.map(r => [r.h, r.count]));
    return Array.from({ length: 24 }, (_, i) => {
      const h = String(i).padStart(2, '0');
      return { date: h, count: byHour.get(h) ?? 0 };
    });
  }

  if (period === '7d' || period === '30d') {
    const days = period === '7d' ? 7 : 30;
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

  if (period === '1y') {
    return db.prepare(`
      WITH RECURSIVE months(m) AS (
        SELECT strftime('%Y-%m', 'now', 'start of month', '-11 months')
        UNION ALL
        SELECT strftime('%Y-%m', m || '-01', '+1 month')
        FROM months WHERE m < strftime('%Y-%m', 'now')
      )
      SELECT m AS date, COALESCE(pv.count, 0) AS count
      FROM months
      LEFT JOIN (
        SELECT strftime('%Y-%m', created_at) AS m, COUNT(*) AS count
        FROM page_views
        WHERE created_at >= datetime('now', 'start of month', '-11 months')
        GROUP BY strftime('%Y-%m', created_at)
      ) pv ON pv.m = months.m
      ORDER BY m ASC
    `).all() as { date: string; count: number }[];
  }

  return db.prepare(`
    SELECT strftime('%Y-%m', created_at) AS date, COUNT(*) AS count
    FROM page_views
    GROUP BY strftime('%Y-%m', created_at)
    ORDER BY date ASC
  `).all() as { date: string; count: number }[];
}

export function getAnalyticsSummary() {
  const totalViews = (db.prepare('SELECT COUNT(*) as count FROM page_views').get() as { count: number }).count;
  return { totalViews };
}
