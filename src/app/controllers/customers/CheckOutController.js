const Order = require('../../models/order.js');

class CheckoutController {
    //[GET] /checkout
    index(req, res) {
        res.render('customers/checkout');
    };
    //[POST] /checkout
    store(req, res) {
        const { phoneNumber, adress, paymentType } = req.body;
        if (!phoneNumber || !adress || !paymentType) {
            req.flash('error', 'All fields are required');
            res.redirect('/checkout');
        }
        // res.render('customers/order');
        const order = new Order({
            customerId: req.user._id,
            items: req.session.cart.items,
            phone: phoneNumber,
            adress: adress,
            paymentType: paymentType,
        })
        order.save()
            .then(result => {
                req.flash('success', 'Checkout successfully !!!');
                delete req.session.cart;
                //Emit
                //  const eventEmitter = req.app.get('eventEmitter');
                //  eventEmitter.emit('orderPlaced', result);

                res.redirect('/customer/orders');
            })
            .catch(error => {
                req.flash('error', 'Something went wrong !!!')
                res.redirect('/checkout')
            })
    }
}

module.exports = new CheckoutController;