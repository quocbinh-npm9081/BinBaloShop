class CustomerController {
    //[GET] /cart
    index(req, res) {
            res.render('customers/cart');
        }
        //[POST] /update-cart
    updateCart(req, res) {
            // cart ={
            //     items : {
            //         id: { item: {} , qty},
            //         id: { item: {} , qty}
            //         id: { item: {} , qty}
            //         id: { item: {} , qty}
            //     }
            //     totalPrice
            //     totalQuality
            // }
            //for the first time creating and adding basic object structure
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalPrice: 0,
                    totalQuality: 0,
                }
            }
            //console.log(req.body);

            // //check if item don't exist in cart
            let cart = req.session.cart;
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalPrice = cart.totalPrice + req.body.price;
                cart.totalQuality = cart.totalQuality + 1;
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
                cart.totalQuality = cart.totalQuality + 1;
            }
            console.log(cart);
            res.json({ totalQuality: cart.totalQuality })
        }
        //[POST] ajax request
    reduceProduct(req, res) {
        if (req.session.cart) {
            let cart = req.session.cart;
            cart.items[req.body.item._id].qty = cart.items[req.body.item._id].qty - 1;
            cart.totalPrice = cart.totalPrice - req.body.item.price;
            cart.totalQuality = cart.totalQuality - 1;
            // if (cart.items[req.body.item._id].qty <= 0) {

            // 
            if (cart.totalQuality <= 0 && cart) {
                cart.items[req.body.item._id].qty = 0;
                cart.totalQuality = 0;
                cart.totalPrice = 0;
            }
            res.json({
                totalQuality: cart.totalQuality,
                qty: cart.items[req.body.item._id].qty,
                totalPrice: cart.totalPrice
            });
        }
    }

}


module.exports = new CustomerController;