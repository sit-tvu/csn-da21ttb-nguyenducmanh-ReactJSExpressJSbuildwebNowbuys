

import { Router } from 'express';
const router = Router();

import { VoucherController } from '../../controllers/index.js'

router.post('/check', VoucherController.checkVoucher)    

export default router