const nodemailer = require('../config/nodemailer');

exports.resetmail = ((user)=>{
    console.log('inside new mail of reset password');
    console.log('user detail: ', user);
    let htmlString = nodemailer.renderTemplate({user:user}, 'resetPassword.ejs');
    nodemailer.transporter.sendMail({
        from : 'codingninja0083@gmail.com',
        to : user.email,
        subject : 'link to reset the password',
        html : htmlString
    }, (err, info)=>{
        if(err){
            console.log('error in sending mail:', err)
            return;
        }
        console.log('message send : ', info);
        return;
    });
})