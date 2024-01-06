

import { Router } from 'express';
const router = Router();

import {checkSigninMiddleware} from '../../middlewares/auth.middleware.js';

import { OrderController } from '../../controllers/index.js';

router.post('/order', checkSigninMiddleware, OrderController.order);
router.post('/by-type', checkSigninMiddleware, OrderController.getByState);

export default router;