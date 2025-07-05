import { Router } from 'express';
import { googleLogin } from './auth.controller';

const router = Router();

router.post('/google', googleLogin);

export default router;