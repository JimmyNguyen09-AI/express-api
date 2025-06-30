import express from "express";
import userRoutes from "./users/user.route";
const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
