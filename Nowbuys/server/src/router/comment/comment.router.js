

import { Router } from 'express';
const router = Router();

import { CommentController } from '../../controllers/index.js'

router.post('/statistical-comments/get', CommentController.getStatisticalCommentsForProduct)  
router.post('/comments/get', CommentController.getCommentsForProduct)  

export default router