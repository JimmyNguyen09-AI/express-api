"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    const data = req.body;
    if (!data.email || !data.provider || !data.providerId) {
        res.status(400).json({
            success: false,
            message: "email, provider, providerId are required",
        });
    }
    const existing = await user_service_1.userService.findByProviderId(data.providerId);
    if (existing) {
        res.status(409).json({ success: false, message: "User already exists" });
    }
    const result = await user_service_1.userService.create(data);
    res.status(result.success ? 201 : 500).json(result);
};
exports.createUser = createUser;
