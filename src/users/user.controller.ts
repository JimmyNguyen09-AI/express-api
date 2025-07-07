import { Request, Response } from 'express';
import { userService } from './user.service'
import { UserCreateDto } from './user.dto';
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const data = req.body as UserCreateDto;
    if (!data.email || !data.provider || !data.providerId) {
        res.status(400).json({
            success: false,
            message: "email, provider, providerId are required",
        });
    }
    const existing = await userService.findByProviderId(data.providerId);
    if (existing) {
        res.status(409).json({ success: false, message: "User already exists" });
    }

    const result = await userService.create(data);
    res.status(result.success ? 201 : 500).json(result);

}

