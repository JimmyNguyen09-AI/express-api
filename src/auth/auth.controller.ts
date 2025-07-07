import { Request, Response } from 'express'
import { verifyGoogleToken } from './googleAuth'
import { userService } from '../users/user.service'
import { UserCreateDto } from '../users/user.dto'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    const { idToken } = req.body as { idToken?: string }
    console.log("🔑 Received idToken:", idToken)

    if (!idToken) {
        res.status(400).json({ success: false, message: 'idToken is required' })
        return
    }

    try {
        const payload = await verifyGoogleToken(idToken)
        console.log("🧾 Payload from Google:", payload)

        if (!payload || !payload.sub || !payload.email) {
            res.status(400).json({ success: false, message: 'Invalid token payload', payload })
            return
        }

        const providerId = payload.sub
        let user = await userService.findByProviderId(providerId)
        console.log("👤 Found user:", user)

        if (!user) {
            const data: UserCreateDto = {
                email: payload.email,
                provider: 'google',
                providerId,
                avatar_url: payload.picture,
            }
            console.log("📥 Creating user:", data)

            const result = await userService.create(data)
            console.log("✅ Create result:", result)

            if (!result.success) {
                res.status(500).json(result)
                return;
            }
            user = result.data
        }

        // ✅ Tạo JWT chứa user.id
        const token = jwt.sign({ userId: user?.id }, JWT_SECRET, {
            expiresIn: '7d',
        })

        // ✅ Gửi JWT vào cookie HttpOnly
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        })

        res.json({ success: true, message: 'Logged in successfully' })
    } catch (err) {
        console.error('❌ Google login error', err)
        res.status(400).json({ success: false, message: 'Invalid or expired token' })
    }
}
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId
    const user = await userService.findById(userId)
    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' })
        return;
    }

    res.json({ success: true, data: user })
}
