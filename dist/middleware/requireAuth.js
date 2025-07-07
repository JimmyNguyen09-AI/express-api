"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const requireAuth = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
        return;
    }
};
exports.requireAuth = requireAuth;
