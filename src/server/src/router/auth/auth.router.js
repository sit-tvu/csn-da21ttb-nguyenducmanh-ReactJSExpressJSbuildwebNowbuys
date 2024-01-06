

import { Router } from 'express';
const router = Router();

import AuthController from '../../controllers/auth/auth.controller.js';

router.post('/profile/get', AuthController.getProfile) 
router.post('/log-in/local', AuthController.loginWithLocal) 
router.post('/log-in/google', AuthController.loginWithGoogleFirebase) 

router.post('/log-out', AuthController.signout) 


export default router