require('dotenv').config();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use(new googleStrategy({
    clientID : process.env.ClientID,
    clientSecret: process.env.ClientSecret,
    callbackURL : process.env.callBackURL
},
async function(acessToken, refreshToken, profile, done){
    console.log('prolife', profile);
    let user = await User.findOne({email : profile.emails[0].value});
    if(user){
        return done(null, user);
    }else{
        let user = await User.create({
            name : profile.displayName,
            email : profile.emails[0].value,
            password : crypto.randomBytes(20).toString('hex')
        });
        return done(null, user);
    }
}));
