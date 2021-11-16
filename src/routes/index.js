const HomeController = require('../app/controllers/HomeControllers');
const CustomerController = require('../app/controllers/customers/CartControllers');
const AuthController = require('../app/controllers/AuthController');
const CheckoutController = require('../app/controllers/customers/CheckOutController');
const OrderController = require('../app/controllers/customers/OrderController')
const AdminController = require('../app/controllers/admin/AdminControllers')
const StatusController = require('../app/controllers/admin/StatusControllers')
    //middleware
const guest = require('../app/middlewares/guest');
const auth = require('../app/middlewares/auth');
const admin = require('../app/middlewares/admin');


function route(app) {
    //HOME
    app.get('/overviews/:_id', HomeController.overViews);
    app.get('/cart', CustomerController.index);
    app.post('/update-cart', CustomerController.updateCart);
    app.post('/reduce-qty', CustomerController.reduceProduct);
    //USER
    app.get('/login', guest, AuthController.login);
    app.post('/login', AuthController.postLogin);
    app.get('/logout', AuthController.logout);
    app.get('/register', guest, AuthController.register);
    app.post('/register', AuthController.postRegister);

    //CUSTOMER
    app.get('/checkout', auth, CheckoutController.index);
    app.post('/checkout', CheckoutController.store);
    app.get('/customer/orders', auth, OrderController.index);
    app.get('/customer/orders/:id', auth, OrderController.show);

    //ADMIN
    app.get('/admin/orders', admin, AdminController.adminOrder);
    app.put('/admin/orders/status', StatusController.update);

    app.get('/', HomeController.index);
}

module.exports = route;