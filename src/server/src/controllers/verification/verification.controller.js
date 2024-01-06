

import { OTPModel } from '../../models/index.js';
import GoogleMail from '../../tasks/Google/gmail/index.js'

export default new class VerificationController {

    // [POST] verification/send/otp-verify-email
    sendEmail(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};

        console.log('sendEmail: ');
        console.log(req.nowbuys_detail_verify);

        (async () => {
            try {
                let otp_code = Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString();

                const send_email_is_ok = await GoogleMail.sendEmailOTP(credentials_info.email, req.nowbuys_detail_verify.subject_mail, otp_code) 

                if (send_email_is_ok) { 

                    const create_otp_is_ok = await OTPModel.insertOTP(credentials_info.id, otp_code, req.nowbuys_detail_verify.type)

                    setTimeout(() => {
                        return  res.status(200).json({
                            success: true,
                            message: 'Send OTP mail is success!'
                        })
                    }, 2000)
                } 

            } catch (err) {
                console.log(err)
                return  res.status(500).json({ 
                    success: false, 
                    message: "Send email failed",
                })
            }
        })() 
    }

    // [POST] verification/receive/otp-verify-email
    receiveOTP(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let otp = req.body.otp?req.body.otp:'';

        (async () => {
            try {
                const is_match_OTP = await OTPModel.isExistOTP(credentials_info.id, otp, req.nowbuys_detail_verify.type)

                if (is_match_OTP) {
                    req.await_change_info_code_auth = process.env.EXPRESS_AWAIT_CHANGE_INFO_CODE_AUTH;
                    const is_del_otp = await OTPModel.deleteOTP(credentials_info.id, otp, req.nowbuys_detail_verify.type)
                } 


                setTimeout(() => {
                    return  res.status(200).json({
                        success: is_match_OTP,
                        otp_match: is_match_OTP,
                        message: is_match_OTP ? 'OTP is match' : 'OTP not match'
                    })
                }, 2000)
            } catch (err) {
                console.log(err)
                return  res.status(500).json({ 
                    success: false, 
                    message: "Error verify OTP in server",
                })
            }
        })() 
    }
 
}