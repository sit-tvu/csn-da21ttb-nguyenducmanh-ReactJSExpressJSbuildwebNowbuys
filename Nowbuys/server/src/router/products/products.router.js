

import { Router } from 'express';
const router = Router();

import { ProductsController } from '../../controllers/index.js'

router.post('/search', ProductsController.searchProducts) 
router.post('/product-most-searched/get', ProductsController.getProductsMostSearched) 

router.post('/show-in-home-page', ProductsController.getProductShowInHomePage) 
router.post('/product-catelogy/get', ProductsController.getProductFollowCatelogy) 
router.post('/details/get', ProductsController.getDetailsProduct) 

export default router