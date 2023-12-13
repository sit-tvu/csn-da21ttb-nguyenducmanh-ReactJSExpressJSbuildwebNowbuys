
import { Router } from 'express';
const router = Router();

import { AuthenMidleware } from '../../middlewares/index.js';

import { ProductController } from '../../controllers/index.js';

router.get('/get/all', AuthenMidleware.checkSigninMiddleware, ProductController.getAllProducts);
router.patch('/change', AuthenMidleware.checkSigninMiddleware, ProductController.changeProduct);


export default router