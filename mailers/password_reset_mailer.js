const nodemailer = require('../config/nodemailer');

module.exports.sendAccessToken = function(user,userAccessToken){

    console.log("Inside sendAccessToken mailer");

    let htmlString = nodemailer.renderTemplate({user: user, userAccessToken: userAccessToken},'./password_reset.ejs');

    nodemailer.transporter.sendMail({
        from: 'aravakrishnaveni2002@gmail.com',
        to: user.email,
        subject: "Your link for restting the pasword",
        html: htmlString

    },function(err,info){
        if(err){
            console.log("Error in sending the mail ",err);
            return;
        }

        return;
    })
}