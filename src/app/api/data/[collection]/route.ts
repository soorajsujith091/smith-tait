import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// Check if MySQL is available
const useDatabase = !!process.env.DATABASE_URL;

let dbInitialized = false;
async function ensureDb() {
  if (!useDatabase) return;
  if (!dbInitialized) {
    const { initDb } = await import('@/lib/db');
    await initDb();
    dbInitialized = true;
  }
}

async function dbQuery(sql: string, values?: any[]) {
  const { query } = await import('@/lib/db');
  return query(sql, values);
}

// Fallback: Read from local JSON file
function readJsonFile(collection: string) {
  const filePath = path.join(process.cwd(), 'src', 'data', `${collection}.json`);
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  }
  return null;
}

// Fallback: Write to local JSON file
function writeJsonFile(collection: string, data: any) {
  const filePath = path.join(process.cwd(), 'src', 'data', `${collection}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;

    // Strategy 1: Try MySQL if DATABASE_URL is configured
    if (useDatabase) {
      try {
        await ensureDb();
        const results: any = await dbQuery(
          'SELECT data FROM json_store WHERE collection_name = ?',
          [collection]
        );
        if (results.length > 0) {
          const data = typeof results[0].data === 'string' ? JSON.parse(results[0].data) : results[0].data;
          return NextResponse.json({ success: true, data });
        }
      } catch (dbError) {
        console.warn(`Database unavailable for "${collection}", falling back to JSON file.`);
      }
    }

    // Strategy 2: Fallback to local JSON files
    const data = readJsonFile(collection);
    if (data !== null) {
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: false, error: 'Collection not found' }, { status: 404 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const data = await request.json();

    // Strategy 1: Try MySQL if DATABASE_URL is configured
    if (useDatabase) {
      try {
        await ensureDb();
        const jsonString = JSON.stringify(data);
        await dbQuery(
          'INSERT INTO json_store (collection_name, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?',
          [collection, jsonString, jsonString]
        );
        return NextResponse.json({ success: true, message: 'Data saved successfully' });
      } catch (dbError) {
        console.warn(`Database unavailable for "${collection}", falling back to JSON file.`);
      }
    }

    // Strategy 2: Fallback to local JSON files
    writeJsonFile(collection, data);
    return NextResponse.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
