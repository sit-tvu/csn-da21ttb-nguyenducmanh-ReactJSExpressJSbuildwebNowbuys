
import { AuthModel } from '../../models/index.js'

export default new class AuthController {

    // ----- General ----- 
    getProfile(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{}; 

        if (credentials_info.id) {
            (async () => {
                try {
                    const profile = await AuthModel.getProfile(credentials_info.id)
                    return  res.status(200).json({
                        is_login: true,
                        message: "You are sign in",
                        user_info: profile, // From session
                    })
                } catch (err) {
                    console.log(err)
                    return  res.status(500).json({ 
                        is_login: false, 
                        message: "Error",
                    })
                }
            })()
        } else {
            return res.json({ 
                is_login: false, 
                message: "You are not log in",
            }) 
        } 
    }

    signout(req, res) {
        req.session.user = null 
        res.json({})
    }

    loginWithLocal(req, res) {
        
        let login_inf = {
            username: req.body.username,
            password: req.body.password
        };

        let err_code_login = {
            username: 4,
            password: 4
        };

        (async () => {
            try {
                let user = await AuthModel.signinWithLocal(login_inf)

                if (user) {
                    err_code_login.username = 1
                    if (login_inf.password === user.password) {
                        err_code_login.password = 1
                        req.session.user = user

                        return res.status(200).json({
                            is_login: true,
                            message: 'Sign in with local account is success',
                            err_code_login: err_code_login
                        })
                    }
                }

                return res.status(200).json({
                    is_login: false,
                    message: 'Sign in with local account is success',
                    err_code_login: err_code_login
                })
            } catch (err) {
                return res.status(400).json({
                    is_login: false,
                    message: 'Sign in with local account is error',
                    err_code_login: err_code_login
                })
            }
        })()
    }

    // ------ Google account with firebase -----
    loginWithGoogleFirebase(req, res) {
        if (req.body.data.uid !=='' && req.body.data.providerData[0].uid !== '') {
            (async () => {
                try {
                    let user_data = {
                        id_firebase: req.body.data.uid,
                        id_provider: req.body.data.providerData[0].uid,
                        firstname: req.body.data.displayName,
                        lastname: '',
                        phone: req.body.data.providerData[0].phoneNumber?req.body.data.providerData[0].phoneNumber:'',
                        sex: 'other',
                        birthday: '2000-01-01',
                        email: req.body.data.email,
                        username: '',
                        password: '',
                        avatar_url: req.body.data.photoURL?req.body.data.photoURL:'',
                        coin: 0,
                        is_delete: false,
                    }

                    const profile = await AuthModel.addUser(user_data)  

                    if (profile) req.session.user = (profile && Object.keys(profile).length > 0) ? profile : null;
                    
                    return  res.status(200).json({
                        is_login: (profile && Object.keys(profile).length > 0),
                        message: "You are sign in",
                    })
                } catch (err) {
                    return  res.status(500).json({ 
                        is_login: false, 
                        message: "Error",
                    })
                }
            })()
        } else {
            return res.json({ 
                is_login: false, 
                message: "You are not log in",
            }) 
        } 
    } 
}