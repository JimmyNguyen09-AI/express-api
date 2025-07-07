"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.text)('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: (0, pg_core_1.varchar)('email', { length: 30 }).notNull().unique(),
    provider: (0, pg_core_1.varchar)('provider', { length: 20 }).notNull(),
    providerId: (0, pg_core_1.varchar)('providerid', { length: 64 }).notNull().unique(),
    avatar_Url: (0, pg_core_1.text)('avatar_url'),
    role: (0, pg_core_1.varchar)('role', { length: 10 }).default('user'),
    createAt: (0, pg_core_1.timestamp)('created_at').default((0, drizzle_orm_1.sql) `now()`),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
