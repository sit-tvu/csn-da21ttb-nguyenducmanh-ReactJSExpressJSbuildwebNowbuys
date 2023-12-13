
import { ResError } from "../utilities/index.js";

export default new class Authen {
    checkSigninMiddleware(req, res, next) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};  

        if (credentials_info.id) {
            return next();
        } else {
            return ResError.forAuthen(res, 401, 'you were not signed in');
        }
    }
}