"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = verifyGoogleToken;
const google_auth_library_1 = require("google-auth-library");
require("dotenv/config");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload) {
        return null;
    }
    return payload;
}
