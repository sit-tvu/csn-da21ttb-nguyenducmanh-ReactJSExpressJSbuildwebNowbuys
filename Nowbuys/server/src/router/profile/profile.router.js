

import { Router } from 'express';
const router = Router();

import { checkSigninMiddleware } from '../../middlewares/auth.middleware.js';

import { ProfileController } from '../../controllers/index.js';

router.post('/change/email', checkSigninMiddleware, ProfileController.changeEmail)  
router.post('/info-user-await-change/add/email', checkSigninMiddleware, ProfileController.addEmailToInfoUserAwaitChange)  


export default router