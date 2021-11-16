const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, require: true, ref: 'user' },
    items: { type: Object, require: true },
    phone: { type: String, require: true },
    adress: { type: String, require: true },
    paymentType: { type: String, default: 'COD' },
    status: { type: String, default: 'order_place' }

}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema);