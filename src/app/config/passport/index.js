const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
    //passport local là một authe giúp ta dễ dàng tích hợp vào app expressJS
    //mặc địn pasport params sử username và password ta cỏ thẻ sử dụng usernameFild và passwordFiled để config lại theo ý ta muốn
    passport.use(new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'No user with this email !' });
        }
        bcrypt.compare(password, user.password) // compare trả về true nếu password bạn nhập trùng với password đã dc băm
            .then(match => {
                if (match) {
                    return done(null, user, { message: 'Logged is successfully !' });
                }
                return done(null, false, { message: 'Wrong email or password !!!' });
            })
            .catch(err => {
                return done(null, false, { message: 'Something went wrong !!!' });
            })
    }))
    passport.serializeUser(function(user, done) { //hàm được gọi khi xác thực thành công để lưu thông tin user vào session
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => { //hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = init;