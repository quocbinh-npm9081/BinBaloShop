const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const backPack_shema = new Schema({
    name: { type: String, require: true },
    imageMain: { type: String, require: true },
    imageBehind: { type: String, require: true },
    imageLeft: { type: String, require: true },
    old_price: { type: Number },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('backpack', backPack_shema);