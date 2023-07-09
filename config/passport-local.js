const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true

}, async function(req, email, password, done){
    //find user and establish the identity
    // console.log('password', password);
    // console.log('email text', email);    
    try {
        let user = await User.findOne({email:email});

        if(!user || ! await bcrypt.compare(password,user.password))
        {
            console.log('Invalid username / password', user);
            req.flash('error', 'invalid email/password');
            return done(null, false);
        }
        // req.flash('success', 'successfully log in');
        return done(null, user);
        
    } catch (error) {
        
            console.log('error in finding user:', error);
            req.flash('error', error);
            return done(error);          
    }
}
));

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies

passport.deserializeUser(async function(id, done){
    try {
        let user = await User.findById(id);
        // if(user){
            return done(null, user);
        // }

    } catch (error) {
        console.log('error in finding user -> passport');
            return done(error);
    }
});


//check is user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is authenticated then pass on the request to the
    // next function
    if (req.isAuthenticated()){
        return next();
    }

    //if user is not sign in
    return res.redirect('/user/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated())
    {
        //req.user contains the current signed in user from the session cookie
        //and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;