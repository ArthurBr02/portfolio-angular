import { db } from '../config/database';

export type AnalyticsPeriod = '1d' | '7d' | '30d' | '1y' | 'all';

export function trackPageView(path: string, userAgent: string, ipHash: string): void {
  db.prepare('INSERT INTO page_views (path, user_agent, ip_hash) VALUES (?, ?, ?)').run(path, userAgent, ipHash);
}

function utcDateStr(offsetDays = 0): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function utcMonthStr(offsetMonths = 0): string {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() + offsetMonths, 1);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function getAnalytics(period: AnalyticsPeriod): { date: string; count: number }[] {
  if (period === '1d') {
    const rows = db.prepare(`
      SELECT strftime('%H', created_at) AS h, COUNT(*) AS count
      FROM page_views
      WHERE date(created_at) = date('now')
      GROUP BY strftime('%H', created_at)
    `).all() as { h: string; count: number }[];
    const map = new Map(rows.map(r => [r.h, r.count]));
    return Array.from({ length: 24 }, (_, i) => {
      const h = String(i).padStart(2, '0');
      return { date: h, count: map.get(h) ?? 0 };
    });
  }

  if (period === '7d' || period === '30d') {
    const days = period === '7d' ? 7 : 30;
    const rows = db.prepare(`
      SELECT date(created_at) AS d, COUNT(*) AS count
      FROM page_views
      WHERE date(created_at) >= ?
      GROUP BY date(created_at)
    `).all(utcDateStr(-(days - 1))) as { d: string; count: number }[];
    const map = new Map(rows.map(r => [r.d, r.count]));
    return Array.from({ length: days }, (_, i) => {
      const d = utcDateStr(-(days - 1 - i));
      return { date: d, count: map.get(d) ?? 0 };
    });
  }

  if (period === '1y') {
    const rows = db.prepare(`
      SELECT strftime('%Y-%m', created_at) AS m, COUNT(*) AS count
      FROM page_views
      WHERE strftime('%Y-%m', created_at) >= ?
      GROUP BY strftime('%Y-%m', created_at)
    `).all(utcMonthStr(-11)) as { m: string; count: number }[];
    const map = new Map(rows.map(r => [r.m, r.count]));
    return Array.from({ length: 12 }, (_, i) => {
      const m = utcMonthStr(-(11 - i));
      return { date: m, count: map.get(m) ?? 0 };
    });
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
