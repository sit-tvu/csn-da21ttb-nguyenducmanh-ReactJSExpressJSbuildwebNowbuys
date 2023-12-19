

import { Router } from 'express';
const router = Router();

import { CheckoutController } from '../../controllers/index.js'
import { checkSigninMiddleware } from '../../middlewares/auth.middleware.js';

router.post('/check', checkSigninMiddleware, CheckoutController.checkAll)    

export default router