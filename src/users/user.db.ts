import { drizzle } from 'drizzle-orm/node-postgres'
import { users } from './user.model';
import { pool } from '../db/pool';
export const userDB = drizzle(pool, { schema: { users } })
