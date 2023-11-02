

import { Router } from 'express';
const router = Router();

import { CheckoutController } from '../../controllers/index.js'

router.post('/check', CheckoutController.checkAll)    

export default router