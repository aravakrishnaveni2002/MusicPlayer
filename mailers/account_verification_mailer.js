const nodemailer = require('../config/nodemailer');

module.exports.sendVerificationLink = function(user_id,user_name,user_email){

    console.log("Inside sendVerificationLink mailer");

    let htmlString = nodemailer.renderTemplate({user_id: user_id,user_name: user_name,user_email: user_email},'./account_verify.ejs');

    nodemailer.transporter.sendMail({
        from: 'aravakrishnaveni2002@gmail.com',
        to: user_email,
        subject: "Your link for verifying the email",
        html: htmlString

    },function(err,info){
        if(err){
            console.log("Error in sending the mail ",err);
            return;
        }

        return;
    })

}