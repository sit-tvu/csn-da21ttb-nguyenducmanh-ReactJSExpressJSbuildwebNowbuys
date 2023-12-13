

import { Router } from 'express';
const router = Router();

import { CartController } from '../../controllers/index.js'

router.post('/products-in-cart/get/all', CartController.getAllProductsInCart) 
router.post('/products-in-cart/get/some', CartController.getSomeProductsInCart) 
router.post('/add-product-to-cart', CartController.addProductToCart) 
router.post('/remove-products-from-cart', CartController.removeProductsFromCart)
router.post('/change-product-number', CartController.changeProductNumberInCart)

export default router