import mysql from 'mysql2/promise';

// Create a connection pool to Hostinger MySQL
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export async function query(sql: string, values?: any[]) {
  try {
    const [results] = await pool.execute(sql, values);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Function to initialize the JSON store table if it doesn't exist
export async function initDb() {
  const sql = `
    CREATE TABLE IF NOT EXISTS json_store (
      collection_name VARCHAR(255) PRIMARY KEY,
      data JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await query(sql);
}
