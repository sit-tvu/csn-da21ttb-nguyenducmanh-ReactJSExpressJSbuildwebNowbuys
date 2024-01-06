

import { Router } from 'express';
const router = Router();

import { GeneralController } from '../../controllers/index.js'

router.get('/brand/get', GeneralController.getBrands)  
router.get('/catelogy/get', GeneralController.getCatelogys)  

export default router