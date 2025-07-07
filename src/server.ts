import express from "express";
import userRoutes from "./users/user.route";
import authRoutes from "./auth/auth.route";
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
const PORT = process.env.PORT;
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',')
    : ['https://zora-frontend-alpha.vercel.app'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(PORT, () => console.log(`Server running on port http://0.0.0.0:${PORT}`));
