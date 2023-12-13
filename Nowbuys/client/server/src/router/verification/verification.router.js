

import { Router } from 'express';
const router = Router();

import { VerificationController } from '../../controllers/index.js';

import { checkSigninMiddleware } from '../../middlewares/auth.middleware.js';

router.post('/send/otp-verify-email', 
    checkSigninMiddleware, 
    (req, res, next) => {
        req.nowbuys_detail_verify = {
            subject_mail: 'Mã OTP xác thực tài khoản', 
            type: 'verify-email'
        }; 
        next();
    }, 
    VerificationController.sendEmail
);

router.post('/receive/otp-verify-email', 
    checkSigninMiddleware,
    (req, res, next) => {
        req.nowbuys_detail_verify = {
            type: 'verify-email'
        };
        next();
    },
    VerificationController.receiveOTP
);

export default router