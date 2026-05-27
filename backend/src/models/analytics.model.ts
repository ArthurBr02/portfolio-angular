import { db } from '../config/database';

export type AnalyticsPeriod = '1d' | '7d' | '30d' | '1y' | 'all';

export function trackPageView(path: string, userAgent: string, ipHash: string): void {
  db.prepare('INSERT INTO page_views (path, user_agent, ip_hash) VALUES (?, ?, ?)').run(path, userAgent, ipHash);
}

function tzModifier(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  return `${sign}${Math.abs(offsetMinutes)} minutes`;
}

function localDateStr(offsetMinutes: number, offsetDays = 0): string {
  const d = new Date(Date.now() + offsetMinutes * 60 * 1000);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function localMonthStr(offsetMinutes: number, offsetMonths = 0): string {
  const d = new Date(Date.now() + offsetMinutes * 60 * 1000);
  d.setUTCMonth(d.getUTCMonth() + offsetMonths, 1);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function getAnalytics(period: AnalyticsPeriod, tzOffsetMinutes: number): { date: string; count: number }[] {
  const tz = tzModifier(tzOffsetMinutes);

  if (period === '1d') {
    const rows = db.prepare(`
      SELECT strftime('%H', datetime(created_at, ?)) AS h, COUNT(*) AS count
      FROM page_views
      WHERE date(datetime(created_at, ?)) = date('now', ?)
      GROUP BY strftime('%H', datetime(created_at, ?))
    `).all(tz, tz, tz, tz) as { h: string; count: number }[];
    const map = new Map(rows.map(r => [r.h, r.count]));
    return Array.from({ length: 24 }, (_, i) => {
      const h = String(i).padStart(2, '0');
      return { date: h, count: map.get(h) ?? 0 };
    });
  }

  if (period === '7d' || period === '30d') {
    const days = period === '7d' ? 7 : 30;
    const rows = db.prepare(`
      SELECT date(datetime(created_at, ?)) AS d, COUNT(*) AS count
      FROM page_views
      WHERE date(datetime(created_at, ?)) >= ?
      GROUP BY date(datetime(created_at, ?))
    `).all(tz, tz, localDateStr(tzOffsetMinutes, -(days - 1)), tz) as { d: string; count: number }[];
    const map = new Map(rows.map(r => [r.d, r.count]));
    return Array.from({ length: days }, (_, i) => {
      const d = localDateStr(tzOffsetMinutes, -(days - 1 - i));
      return { date: d, count: map.get(d) ?? 0 };
    });
  }

  if (period === '1y') {
    const rows = db.prepare(`
      SELECT strftime('%Y-%m', datetime(created_at, ?)) AS m, COUNT(*) AS count
      FROM page_views
      WHERE strftime('%Y-%m', datetime(created_at, ?)) >= ?
      GROUP BY strftime('%Y-%m', datetime(created_at, ?))
    `).all(tz, tz, localMonthStr(tzOffsetMinutes, -11), tz) as { m: string; count: number }[];
    const map = new Map(rows.map(r => [r.m, r.count]));
    return Array.from({ length: 12 }, (_, i) => {
      const m = localMonthStr(tzOffsetMinutes, -(11 - i));
      return { date: m, count: map.get(m) ?? 0 };
    });
  }

  return db.prepare(`
    SELECT strftime('%Y-%m', datetime(created_at, ?)) AS date, COUNT(*) AS count
    FROM page_views
    GROUP BY strftime('%Y-%m', datetime(created_at, ?))
    ORDER BY date ASC
  `).all(tz, tz) as { date: string; count: number }[];
}

export function getAnalyticsSummary() {
  const totalViews = (db.prepare('SELECT COUNT(*) as count FROM page_views').get() as { count: number }).count;
  return { totalViews };
}
