import express from "express";
import userRoutes from "./users/user.route";
import authRoutes from "./auth/auth.route";
const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
