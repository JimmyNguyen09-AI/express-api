import { Router } from 'express'
import { googleLogin, getCurrentUser } from './auth.controller'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

router.post('/google', googleLogin)
router.get('/me', requireAuth, getCurrentUser)

export default router
