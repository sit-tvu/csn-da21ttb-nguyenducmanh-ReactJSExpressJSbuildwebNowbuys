

import { Router } from 'express';
const router = Router();

import { ShipController } from '../../controllers/index.js'

router.post('/get', ShipController.get)  
router.post('/new', ShipController.new)  

export default router