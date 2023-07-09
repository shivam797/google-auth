require('dotenv').config();
const express = require('express');
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportGoogle = require('./config/passport-google-oauth-strategy');
const flash  = require('connect-flash');
const customware = require('./config/middleware');
//----------------------------------------------------------
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

//------------------------------------------------------------
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(session({
    name : 'googleauth',
    secret : 'something',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge: 1000*60*100
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customware.setFlash);


app.use('/', require('./routers/index'));

app.listen(port, function(err){
    if(err){
        console.log('the error while running the port:', err)
    }
    console.log(`the server is running on the port : ${port}`);
});