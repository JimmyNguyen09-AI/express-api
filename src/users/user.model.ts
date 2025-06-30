import { pgTable, text, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';
export const users = pgTable('users', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: varchar('email', { length: 30 }).notNull().unique(),
    provider: varchar('provider', { length: 20 }).notNull(),
    providerId: varchar('providerid', { length: 64 }).notNull().unique(),
    avatar_Url: text('avatar_url'),
    role: varchar('role', { length: 10 }).default('user'),
    createAt: timestamp('created_at').default(sql`now()`),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})


export interface User {
    id?: string;
    email: string;
    provider: string;
    providerId: string;
    avatarUrl?: string;
    role: string;
    createAt?: Date;
    updatedAt?: Date;
}
export type RequestResponse = {
    success: boolean;
    message?: string;
    data?: any;
};