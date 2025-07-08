import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
            ; (req as any).userId = decoded.userId
        next()
    } catch {
        res.status(401).json({ success: false, message: 'Invalid token' })
    }
}
