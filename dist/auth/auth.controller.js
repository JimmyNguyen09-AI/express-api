"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.googleLogin = void 0;
const googleAuth_1 = require("./googleAuth");
const user_service_1 = require("../users/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const googleLogin = async (req, res) => {
    const { idToken } = req.body;
    console.log("🔑 Received idToken:", idToken);
    if (!idToken) {
        res.status(400).json({ success: false, message: 'idToken is required' });
        return;
    }
    try {
        const payload = await (0, googleAuth_1.verifyGoogleToken)(idToken);
        console.log("🧾 Payload from Google:", payload);
        if (!payload || !payload.sub || !payload.email) {
            res.status(400).json({ success: false, message: 'Invalid token payload', payload });
            return;
        }
        const providerId = payload.sub;
        let user = await user_service_1.userService.findByProviderId(providerId);
        console.log("👤 Found user:", user);
        if (!user) {
            const data = {
                email: payload.email,
                provider: 'google',
                providerId,
                avatar_url: payload.picture,
            };
            console.log("📥 Creating user:", data);
            const result = await user_service_1.userService.create(data);
            console.log("✅ Create result:", result);
            if (!result.success) {
                res.status(500).json(result);
                return;
            }
            user = result.data;
        }
        // ✅ Tạo JWT chứa user.id
        const token = jsonwebtoken_1.default.sign({ userId: user?.id }, JWT_SECRET, {
            expiresIn: '7d',
        });
        // ✅ Gửi JWT vào cookie HttpOnly
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        });
        res.json({ success: true, message: 'Logged in successfully' });
    }
    catch (err) {
        console.error('❌ Google login error', err);
        res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }
};
exports.googleLogin = googleLogin;
const getCurrentUser = async (req, res) => {
    const userId = req.userId;
    const user = await user_service_1.userService.findById(userId);
    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }
    res.json({ success: true, data: user });
};
exports.getCurrentUser = getCurrentUser;
