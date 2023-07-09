const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signIn');
}

module.exports.signUp = function(req, res){
    try {
        if(req.isAuthenticated()){
            return res.redirect('/');
        }
        

        return res.render('signUp');
    } catch (error) {
        
    }
   
}

module.exports.createUser = async function(req, res){
    try {
        let user = await User.findOne({email : req.body.email});
        const hash = await bcrypt.hash(req.body.password, 10);
        console.log('hash password', hash);
        if(!user){
            if (req.body.password == req.body.confpassword){
                const user = await User.create({
                    name : req.body.name,
                    email : req.body.email,
                    password : hash
                });
                // console.log('user create =', user);
                req.flash('success', 'user successfully created new account');
        }   

        else{
            console.log('password and confirm password does not match');
        }}
        else{
            console.log('user with given email already exist');
        }
        return res.redirect('sign-in');        
    } catch (error) {
        console.log('error while creating new user account', error);
    }    
}

module.exports.createSession = function(req, res){
    try {
        // console.log('local user detail', res.locals);
        req.flash('success', 'successfully log in');
        return res.redirect('/');

    } catch (error) {
        
    }    
}
module.exports.signOut = function(req, res){

    try {
        req.logout(function(err){
            if(err){
                console.log('error while log out', err);
            }
        });
        req.flash('success', 'user successfully log out');        
        return res.redirect('/user/sign-in');
    } catch (error) {
        req.flash('error', error);
    }
    
}
// module.exports.reset = function(req, res){
//     return res.render('reset');
// }
module.exports.reset = function(req, res){
    // console.log(res.locals.user);
    
    return res.render('reset');
    
}

module.exports.resetPassword = async function(req, res){
    // console.log('local user', res.locals.user);
    // console.log('post request', req.body);
    
    if(await bcrypt.compare(req.body.oldpassword, res.locals.user.password)){

        if(req.body.newpassword == req.body.confirmpassword){
            let hash = await bcrypt.hash(req.body.newpassword, 10);
            // console.log('hash', hash);
            await User.findByIdAndUpdate(res.locals.user.id, {password:hash});
            console.log('done');
        }

    }
    req.flash('success', 'password has been successfully reset');
    return res.redirect('/');

}