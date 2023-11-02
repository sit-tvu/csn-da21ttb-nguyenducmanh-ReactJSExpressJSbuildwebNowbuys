
import { AuthModel } from '../../models/index.js'

export default new class ProfileController {

    changeEmail(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};  

        (async () => {
            try {
                
                // const profile = await AuthModel.getProfile(credentials_info.id)

                setTimeout(() => {
                    return  res.status(200).json({
                        success: true,
                        message: "Change email is success!",
                    })
                }, 2000)


            } catch (err) {
                console.log(err)
                return  res.status(400).json({ 
                    success: false, 
                    message: "Error when change email",
                })
            }
        })() 
    } 

    // [POST] /prodile/info-user-await-change/add/email
    addEmailToInfoUserAwaitChange(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};  
        let new_email = req.body.new_email?req.body.new_email:'';
        

        (async () => {
            try {
                
                const profile = await AuthModel.addEmailToInfoUserAwaitChange(credentials_info.id, new_email)

                setTimeout(() => {
                    return  res.status(200).json({
                        success: true,
                        message: "Change email is success!",
                    })
                }, 2000)


            } catch (err) {
                console.log(err)
                return  res.status(400).json({ 
                    success: false, 
                    message: "Error when change email",
                })
            }
        })() 
    } 
}