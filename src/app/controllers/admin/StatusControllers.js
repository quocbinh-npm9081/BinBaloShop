const Order = require("../../models/order");

class StatusController {
    //[POST]
    update(req, res, next) {
        Order.updateOne({ _id: req.body.orderid }, { status: req.body.status })
            .then(() => {
                //Emit event
                //console.log(req.app);
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated', { id: req.body.orderid, status: req.body.status })
                return res.redirect('/admin/orders')
            })
            .catch(error => {
                console.log(error)
            })
    }

}
module.exports = new StatusController;