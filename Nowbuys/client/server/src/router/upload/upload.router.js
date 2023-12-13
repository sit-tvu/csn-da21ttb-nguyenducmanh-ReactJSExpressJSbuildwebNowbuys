

import { Router } from 'express';
const router = Router();

import { UploadController } from '../../controllers/index.js'

import { checkSigninMiddleware } from '../../middlewares/auth.middleware.js'; 

router.post('/test/update', checkSigninMiddleware, UploadController.updateTest);
router.post('/avatar/update', checkSigninMiddleware, UploadController.updateAvatar);


export default router