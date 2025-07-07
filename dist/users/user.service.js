"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_db_1 = require("./user.db");
const user_model_1 = require("./user.model");
const drizzle_orm_1 = require("drizzle-orm");
exports.userService = {
    create: async (data) => {
        try {
            const result = await user_db_1.userDB.insert(user_model_1.users).values(data).returning();
            return { success: true, message: 'User created successfully', data: result[0] };
        }
        catch (err) {
            console.error("Error creating user:", err);
            return { success: false, message: "Failed to create user" };
        }
    },
    findByProviderId: async (providerId) => {
        try {
            const result = await user_db_1.userDB.select().from(user_model_1.users).where((0, drizzle_orm_1.eq)(user_model_1.users.providerId, providerId));
            return result[0] ?? null;
        }
        catch {
            return null;
        }
    },
    findByEmail: async (email) => {
        try {
            const result = await user_db_1.userDB.select().from(user_model_1.users).where((0, drizzle_orm_1.eq)(user_model_1.users.email, email));
            return result[0] ?? null;
        }
        catch {
            return null;
        }
    },
    findById: async (id) => {
        try {
            const result = await user_db_1.userDB.select().from(user_model_1.users).where((0, drizzle_orm_1.eq)(user_model_1.users.id, id));
            return result[0] ?? null;
        }
        catch {
            return null;
        }
    }
};
