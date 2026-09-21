import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL is not defined in .env');
    process.exit(1);
  }

  console.log('🔌 Connecting to Hostinger MySQL Database...');
  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
  });

  try {
    console.log('🛠️ Creating json_store table if not exists...');
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS json_store (
        collection_name VARCHAR(255) PRIMARY KEY,
        data JSON NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const dataDir = path.join(process.cwd(), 'src/data');
    const files = await fs.readdir(dataDir);
    
    console.log(`📂 Found ${files.length} JSON files to migrate...`);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const collectionName = file.replace('.json', '');
        const filePath = path.join(dataDir, file);
        
        try {
          const content = await fs.readFile(filePath, 'utf8');
          
          if (!content.trim()) {
            console.log(`⚠️ Skipping empty file: ${file}`);
            continue;
          }

          const jsonData = JSON.parse(content);
          
          await pool.execute(
            'INSERT INTO json_store (collection_name, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?',
            [collectionName, JSON.stringify(jsonData), JSON.stringify(jsonData)]
          );
          
          console.log(`✅ Migrated collection: ${collectionName}`);
        } catch (err: any) {
          console.error(`❌ Error migrating ${file}:`, err.message);
        }
      }
    }

    console.log('🎉 Migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await pool.end();
  }
}

migrate();
