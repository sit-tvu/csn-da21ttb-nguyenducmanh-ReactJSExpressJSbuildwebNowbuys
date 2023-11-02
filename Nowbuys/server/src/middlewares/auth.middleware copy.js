
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {connectDatabaseNowbuys} from '../databases/connect.js';


// For Google authentication
passport.use(
    new GoogleStrategy(
        {
            clientID: '132417811666-hfn3nubroqs3n91qge6gkk76nfmjhlov.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:8000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, callback) => {

            // Based on the 'Profile' information returned by Google, 
            // check if the user already exists in the database to save 
            // or get the user information from the database and send it to the 'done' function to continue handle

            let dataUser = {
                id: profile.id,
                username: profile._json.name,
                picture: profile._json.picture,
                email: profile._json.email,
            }

            callback(null, dataUser)
        }
    )
)

// For local authentication
passport.use(
    new LocalStrategy(
        async (username, password, done) => {

            let err_code_login = {
                username: 4, // 1: correct, 4: incorrect
                password: 4 // 1: correct, 4: incorrect
            }

            let user_info = undefined
            
            try {
                let scriptSQL = `SELECT * FROM user WHERE username = '${username}'`
                connectDatabaseNowbuys.query(scriptSQL, async (err, results) => {
                    console.log('Compare info with database');
                    if (results && results.length === 1) {
                        err_code_login.username = 1
                        if (password === results[0].password) {
                            err_code_login.password = 1
                            user_info = results[0]
                        }
                    } 
                    return done(null, user_info, err_code_login)
                })
            } catch (e) {
                console.log('Passport middleware: ' + e)
                return done(null, user_info, err_code_login)
            }
        }
    )
)

// const GoogleFirebaseSignInMiddleware = (req, res, next) => {
//     passportStrategy.authenticate('local', (err, user_info, err_code_login) => { // Received from 'done(null, user_info, err_code_login) 
//         req.logIn(user_info, () => {}) // Notify 'passport.serializeUser()' that login is successful
//         req.err_code_login = err_code_login // Attach 'err_code_login' to 'req.err_code_login' to send next route
//         return next()
//     })(req, res, next) // IIFE syntax
// }

const localSignInMiddleware = (req, res, next) => {
    passportStrategy.authenticate('local', (err, user_info, err_code_login) => { // Received from 'done(null, user_info, err_code_login) 
        req.logIn(user_info, () => {}) // Notify 'passport.serializeUser()' that login is successful
        req.err_code_login = err_code_login // Attach 'err_code_login' to 'req.err_code_login' to send next route
        return next()
    })(req, res, next) // IIFE syntax
}


// --------- General ----------

// If successful login notify is received, attach 'user_info' into req.session response to client
passport.serializeUser((user_info_to_encode_session, done) => { // user_info_to_encode_session recevived from 'user_info' in req.logIn(user_info, ()=>{})
    done(null, user_info_to_encode_session)
})

// Get 'user_info' from request of client
passport.deserializeUser((session_decode_from_client, done) => {
    // You can check user in database in here
    // but follow me you need check user in controller folder
    done(null, session_decode_from_client)
})



export { localSignInMiddleware }

const passportStrategy = passport
export default passportStrategy 
