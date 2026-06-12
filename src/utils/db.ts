import initSqlJs from 'sql.js';
import type { Database } from 'sql.js';
import { seedDatabaseQueries } from '../data/challenges';

export interface QueryResult {
  success: boolean;
  data?: any[];
  error?: string;
}

let dbInstance: Database | null = null;
let initPromise: Promise<Database> | null = null;

export async function getDb(): Promise<Database> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;
  
  initPromise = (async () => {
    const SQL = await initSqlJs({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/sql.js@1.14.1/dist/${file}`
    });
    dbInstance = new SQL.Database();
    
    // Seed the database
    seedDb(dbInstance);
    
    return dbInstance;
  })();
  
  return initPromise;
}

function seedDb(db: Database) {
  // Drop existing tables to ensure a clean slate
  const tables = [
    'products', 'orders', 'reviews', 'drivers', 'rides', 
    'users', 'friendships', 'posts', 'titles', 
    'watch_history', 'transactions', 'disputes',
    'listings', 'bookings', 'songs', 'playlists', 'playlist_tracks',
    'videos', 'comments',
    'accounts', 'loans', 'campaigns', 'conversions', 'agents', 'tickets'
  ];
  
  for (const table of tables) {
    try {
      db.run(`DROP TABLE IF EXISTS ${table};`);
    } catch (e) {
      // Ignore
    }
  }
  
  // Split and execute each seeding statement
  const statements = seedDatabaseQueries
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);
      
  for (const stmt of statements) {
    try {
      db.run(stmt + ';');
    } catch (e) {
      console.error("Failed to run seed statement in SQLite:", stmt, e);
    }
  }
}

export async function runQuery(userSql: string): Promise<QueryResult> {
  try {
    const db = await getDb();
    
    // Re-seed tables to ensure query isolation
    seedDb(db);
    
    // sql.js exec returns: { columns: string[], values: any[][] }[]
    const res = db.exec(userSql);
    
    if (res.length === 0) {
      return { success: true, data: [] };
    }
    
    const { columns, values } = res[0];
    const formattedData = values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, idx: number) => {
        obj[col] = row[idx];
      });
      return obj;
    });
    
    return { success: true, data: formattedData };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
}

export async function getTableData(tableName: string): Promise<any[]> {
  try {
    const db = await getDb();
    const res = db.exec(`SELECT * FROM ${tableName}`);
    if (res.length === 0) return [];
    
    const { columns, values } = res[0];
    return values.map((row: any[]) => {
      const obj: any = {};
      columns.forEach((col: string, idx: number) => {
        obj[col] = row[idx];
      });
      return obj;
    });
  } catch (e) {
    return [];
  }
}
