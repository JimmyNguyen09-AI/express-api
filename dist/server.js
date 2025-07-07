"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./users/user.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://zora-frontend-alpha.vercel.app/',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/users", user_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.listen(5000, () => console.log("Server running on port http://127.0.0.1:5000"));
