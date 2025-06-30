import { db } from './client';
import { sql } from 'drizzle-orm';
import 'dotenv/config'

async function createTables() {
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`)
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(30) NOT NULL UNIQUE,
        provider VARCHAR(20) NOT NULL,
        providerId VARCHAR(64) NOT NULL UNIQUE,
        avatar_url TEXT,
        role VARCHAR(10) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )`);
    console.log('Tạo bảng thành công!');
}

createTables().catch(console.error);