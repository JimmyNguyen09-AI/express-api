import express from "express";
import userRoutes from "./users/user.route";
import authRoutes from "./auth/auth.route";
import cors from 'cors'
import cookieParser from 'cookie-parser'



const app = express();
app.use(cors({
    origin: 'https://zora-frontend-alpha.vercel.app/',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(5000, () => console.log("Server running on port http://127.0.0.1:5000"));
