function checkSigninMiddleware(req, res, next) {
    let credentials_info = (req.session && req.session.user)?req.session.user:{};  

    if (credentials_info.id) {
        return next();
    } else {
        return res.status(401).json({ 
            is_login: false, 
            message: "You are not log in",
        })
    }
}
export { checkSigninMiddleware }