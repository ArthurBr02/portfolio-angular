import getDb from '../config/database';

export interface PageView {
  id: number;
  path: string;
  user_agent: string;
  ip_hash: string;
  created_at: string;
}

export function recordPageView(path: string, userAgent: string, ipHash: string): void {
  const db = getDb();
  db.prepare('INSERT INTO page_views (path, user_agent, ip_hash) VALUES (?, ?, ?)').run(path, userAgent, ipHash);
}

export function getVisitsLastDays(days: number): { date: string; count: number }[] {
  const db = getDb();
  return db.prepare(`
    SELECT date(created_at) as date, COUNT(*) as count 
    FROM page_views 
    WHERE created_at >= date('now', ?)
    GROUP BY date(created_at)
    ORDER BY date(created_at) ASC
  `).all(`-${days} days`) as { date: string; count: number }[];
}

export function getTotalViews(): number {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) as count FROM page_views').get() as { count: number };
  return row.count;
}
