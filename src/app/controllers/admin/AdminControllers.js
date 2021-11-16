//const order = require("../../models/order");
const Order = require("../../models/order");

class AdminController {
    //[GET]
    adminOrder(req, res) {
        Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password')
            .exec((error, orders) => {
                if (req.xhr) {
                    res.json(orders);
                } else {
                    // console.log(orders.length)
                    res.render('admin/orders', { orders: orders.length });
                }

            })
    }


}
module.exports = new AdminController;