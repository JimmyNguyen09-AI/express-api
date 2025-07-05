import { Request, Response } from 'express';
import { verifyGoogleToken } from './googleAuth';
import { userService } from '../users/user.service';
import { UserCreateDto } from '../users/user.dto';

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    const { idToken } = req.body as { idToken?: string };
    if (!idToken) {
        res.status(400).json({ success: false, message: 'idToken is required' });
        return;
    }

    try {
        const payload = await verifyGoogleToken(idToken);
        if (!payload || !payload.sub || !payload.email) {
            res.status(400).json({ success: false, message: 'Invalid token' });
            return;
        }

        const providerId = payload.sub;
        let user = await userService.findByProviderId(providerId);
        if (!user) {
            const data: UserCreateDto = {
                email: payload.email,
                provider: 'google',
                providerId,
                avatar_url: payload.picture,
            };
            const result = await userService.create(data);
            if (!result.success) {
                res.status(500).json(result);
                return;
            }
            user = result.data;
        }

        res.json({ success: true, data: user });
    } catch (err) {
        console.error('Google login error', err);
        res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }
};