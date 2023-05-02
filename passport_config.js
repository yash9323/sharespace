import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import * as h from './helpers.js';

function initialize(passport, getuserbyemail, getuserbyid) {
    const authenticateuser = async (email, password, done) => {
        try {
            h.eaddresschecker(email)
            h.passwordchecker(password)
        }
        catch (e) {
            return done(e);
        }
        const user = getuserbyemail(email.toLowerCase())
        if (user == null) {
            return done(null, false, { message: 'Error: The User Is Not Registered! Please Register' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Password Is Incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use('login', new LocalStrategy({ usernameField: 'email' },
        authenticateuser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getuserbyid(id))
    })
}

export default initialize