import express from "express";
import userRoutes from "./users/user.route";
import authRoutes from "./auth/auth.route";
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["https://zora-frontend-alpha.vercel.app", "https://www.jnzora.com"],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(PORT, () => console.log(`Server running on port http://127.0.0.1:${PORT}`));
