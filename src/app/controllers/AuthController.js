const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
class AuthController {
    login(req, res) {
        res.render('auth/login');
    }
    register(req, res) {
        res.render('auth/register');
    }
    async postRegister(req, res) {
        const { username, email, phoneNumber, password } = req.body;
        if (!username || !email || !password) {
            req.flash('error', 'All fields are required !');
            req.flash('name', username);
            req.flash('email', email);
            req.flash('phoneNumber', phoneNumber);
            res.redirect('/register');
        }
        User.exists({ email: email }, function(err, result) { // if email exists , result return true
            if (result) {
                req.flash('error', 'Email already taken !');
                req.flash('name', username);
                req.flash('email', email);
                req.flash('phoneNumber', phoneNumber);
                return res.redirect('/register')
            }
        });
        User.exists({ phoneNumber: phoneNumber }, function(err, result) { // if phoneNumber exists , result return true
            if (result) {
                req.flash('error', 'Phone number already taken !');
                req.flash('name', username);
                req.flash('email', email);
                req.flash('phoneNumber', phoneNumber);
                return res.redirect('/register')
            }
        });
        //hash password ( mã hóa mật khẩu với bcript npm)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
            username: username,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });
        user.save()
            .then((user) => {
                res.redirect('/login');
            })
            .catch((err) => {
                req.flash('error', 'Something went wrong !');
                req.flash('name', username);
                req.flash('email', email);
                req.flash('phoneNumber', phoneNumber);
                return res.redirect('/register')
            })



    }
    postLogin(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                req.flash('error', info.message);
                return next(err);
            }
            if (!user) {
                req.flash('error', info.message);
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                return res.redirect('/');
            })
        })(req, res, next)
    };
    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = new AuthController;