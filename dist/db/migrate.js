"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const drizzle_orm_1 = require("drizzle-orm");
require("dotenv/config");
async function createTables() {
    await client_1.db.execute((0, drizzle_orm_1.sql) `CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await client_1.db.execute((0, drizzle_orm_1.sql) `
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
