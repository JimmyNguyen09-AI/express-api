import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface GooglePayload {
    sub: string;
    email?: string;
    picture?: string;
}

export async function verifyGoogleToken(idToken: string): Promise<GooglePayload | null> {
    const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload() as GooglePayload | undefined;
    if (!payload) {
        return null;
    }
    return payload;
}