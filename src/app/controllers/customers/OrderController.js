const Order = require('../../models/order');
const moment = require('moment');

class OrderController {
    async index(req, res) {
        const orders = await Order.find({ customerId: req.user._id }).sort({ createdAt: 'desc' }); //  desc = -1 // sap xep giam gian
        //console.log(orders.items['613833f5c1a226f7b5167574'])
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('customers/order', { orders: orders, moment });
    }
    async show(req, res) {
        const orders = await Order.findById(req.params.id);
        const order_id = orders.customerId.toString();
        const user_id = req.user._id.toString();
        // if (order_id === user_id) {
        //     res.render('customers/singleOrder', { orders: orders })
        // }
        res.render('customers/singleOrder', { orders: orders })
            //  res.redirect('/')
    }
}


module.exports = new OrderController;