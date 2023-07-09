const User = require('../models/user');
const bcrypt = require('bcrypt');
const mailer = require('../mailers/resetPassword');
module.exports.reset = function(req, res){
    return res.render('email_reset');
    
}

module.exports.sendMail = async function(req, res){
    // console.log(req.originalUrl, req.url);
    const user =  await User.findOne({email : req.body.email})
    console.log(user);
    if(user){
    mailer.resetmail(user);
    }
    return res.redirect('/');
}

module.exports.resetbyemail = async function(req, res){

    // console.log('id of user :',req.params.id);
    
    return res.render('emailPassword',{
        id : req.params.id
    });
}

module.exports.resetPassword = async function(req, res){
    
    // console.log('id of reset password', req.params.id);
    let user = await User.findById(req.params.id);
    if(req.body.password == req.body.confirmpassword){
        const hash = await bcrypt.hash(req.body.password, 10);
        await User.findByIdAndUpdate(req.params.id, {password : hash});        
    }
    // console.log('user details:', user);
    return res.redirect('/');     
}