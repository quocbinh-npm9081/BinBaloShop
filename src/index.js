require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const DB = require('./app/config/mongoDB/index');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportConfig = require('./app/config/passport/index');
const port = process.env.PORT || 4000;
const flash = require('express-flash');
const route = require('./routes/index');
const methdOverride = require('method-override');
const Emitter = require('events');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './resources/views'));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//connect mongo database
DB.connect();
///Event emitter ( bat su kien socket io realtime)
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);
//SESSION MIDDLEWARE
app.use(session({
    secret: 'mysecert',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/BinhBackpack',
        collectionName: 'sessions'
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } //24 hours
}));

//FLASH MIDDLEWARE
app.use(flash());

passportConfig(passport); // kich ban passort
app.use(passport.initialize()); //khởi tạo mô-đun xác thực, được gọi ở từng request, kiểm tra session lấy ra passport.user nếu chưa có thì tạo rỗng.
app.use(passport.session()); //được gọi ở từng request, kiểm tra session lấy ra passport.user nếu chưa có thì tạo rỗng.
//asset files
app.use(express.static(path.join(__dirname, './public')));

//Global middleware
// override with POST having ?_method=PUT or DELETE 
app.use(methdOverride('_method'));
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});
route(app);
//Passport config


const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//Socket IO
const io = require('socket.io')(server);
io.on('connection', (socket) => { // socketIO bắt đầu  giữ iên lạc giữa client và server, nếu chúng ta Ctr+C huỷ server thì socket sẽ chết

    console.log('connected socketIO') // khi có sự kiện diễn ra thì ( load trang) thì sẽ kết nối đên socket

    socket.on('disconnect', () => { // khi có user or admin thoat trang thì socket sẽ thông báo rằng ng ấy đã disconnected
        console.log('user disconnected');
    });

    //Join  
    //console.log(socket.id)
    socket.on('join', (orderId) => {
        //     console.log(orderId);
        socket.join(orderId);
    })
})

//realtime admin -> user
eventEmitter.on('orderUpdated', (data) => {
    //io.to() là bắt sự kiện đến room
    io.to(`order_${data.id}`).emit('orderUpdated', data);
});
//realtime user -> admin
// eventEmitter.on('orderPlaced', (data) => {
//     io.to('adminRoom').emit('orderPlaced', data);
// });