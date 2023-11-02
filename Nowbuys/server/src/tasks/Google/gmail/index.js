
import nodemailer from 'nodemailer';
import { OAuth2Client } from "google-auth-library";

let GOOGLE_MAILER_CLIENT_ID = '436050321237-qdd6ng8ebs7dsgmkio47497u34jhpskj.apps.googleusercontent.com';
let GOOGLE_MAILER_CLIENT_SECRET = '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';
let GOOGLE_MAILER_REFRESH_TOKEN = '1//04Wrvz-DFzRA7CgYIARAAGAQSNwF-L9IrGh3SxhiTlmmx06Ki0lKu_6YEWuRYb6fL4D0DFQfh2krOiXNV91V1E5SjVlpcWe7f_Uo';
let ADMIN_EMAIL_ADDRESS = 'authen.manhducjr@gmail.com';

// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
)

// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

export default new class GoogleMail {

    constructor() {
        console.log('contructor send email');
    }

    async sendEmailOTP(toEmail, subject, otp_code) {
        return await new Promise(async (resolve, reject) => {
            try { 
                const myAccessTokenObject = await myOAuth2Client.getAccessToken()
                // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
                const myAccessToken = myAccessTokenObject?.token
                // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: ADMIN_EMAIL_ADDRESS,
                        clientId: GOOGLE_MAILER_CLIENT_ID,
                        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                        accessToken: myAccessToken
                    }
                })

                // mailOption là những thông tin gửi từ phía client lên thông qua API
                const mailOptions = {
                    to: toEmail,
                    subject: subject,
                    html: `
                        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                            <div style="margin:50px auto;width:70%;padding:20px 0">
                            <div style="border-bottom:1px solid #eee">
                                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Nowbuys</a>
                            </div>
                            <p style="font-size:1.1em">Xinh chào,</p>
                            <p>Cảm ơn bạn đã lựa chọn Nowbuys. Sử dụng OTP sau để hoàn tất thủ tục Đăng ký của bạn. OTP có hiệu lực trong 5 phút</p>
                            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp_code}</h2>
                            <p style="font-size:0.9em;">Trân trọng,<br />Nowbuys</p>
                            <hr style="border:none;border-top:1px solid #eee" />
                            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                                <p>Nowbuys Inc</p>
                                <p>37 Phố Thanh Trì Dịch Vọng Hậu</p>
                                <p>Hà Nội, Việt Nam</p>
                            </div>
                            </div>
                        </div>
                    ` 
                }
                // await transport.sendMail(mailOptions)

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
}