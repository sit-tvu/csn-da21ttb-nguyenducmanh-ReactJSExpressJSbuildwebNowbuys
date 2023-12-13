

import { Router } from 'express';
const router = Router();

import OrderController from '../../controllers/order/Order.controller.js';

router.post('/profile/get', OrderController.getProfile);


export default router