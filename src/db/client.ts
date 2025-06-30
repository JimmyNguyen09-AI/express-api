import { drizzle } from 'drizzle-orm/node-postgres'
import { pool } from './pool'
import 'dotenv/config'

export const db = drizzle(pool)
