const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const user_Schema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phoneNumber: { type: String, require: true, unique: true },
    role: { type: String, default: 'customer' }
}, {
    timestamps: true
});


module.exports = mongoose.model('user', user_Schema);