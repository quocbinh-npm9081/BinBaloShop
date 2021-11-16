const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/BinhBackpack', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('SUCCESSFUL CONNECTION !');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };