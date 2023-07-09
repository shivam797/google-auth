const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);
// mongoose.connect('mongodb://0.0.0.0/googleauth');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error while connecting to db'));

db.once('open', function(){
    console.log('successfully connected to the database');
});
module.exports = db;