import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token
    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized - No token provided' })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
            ; (req as any).userId = decoded.userId
        next()
    } catch {
        res.status(401).json({ success: false, message: 'Invalid or expired token' })
        return
    }
}
