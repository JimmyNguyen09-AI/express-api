import { userDB } from './user.db'
import { users, RequestResponse } from './user.model'
import { UserCreateDto } from './user.dto'
import { eq } from 'drizzle-orm'

export const userService = {
    create: async (data: UserCreateDto): Promise<RequestResponse> => {
        try {
            const result = await userDB.insert(users).values(data).returning();
            return { success: true, message: 'User created successfully', data: result[0] };
        } catch (err) {
            console.error("Error creating user:", err);
            return { success: false, message: "Failed to create user" }
        }
    },
    findByProviderId: async (providerId: string) => {
        try {
            const result = await userDB.select().from(users).where(eq(users.providerId, providerId));
            return result[0] ?? null;
        } catch {
            return null;
        }
    },
}