export interface UserCreateDto {
    email: string;
    provider: string;
    providerId: string;
    avatar_url?: string;
    role?: string;
}
