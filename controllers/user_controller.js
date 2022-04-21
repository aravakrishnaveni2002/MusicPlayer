const User = require('../model/User');
const Song = require('../model/Songs');
const Favourite = require('../model/Favourite');
const AccessToken = require('../model/AccessToken');

const crypto = require('crypto');
const passwordRestMailer = require('../mailers/password_reset_mailer');
const accountVerificationMailer = require('../mailers/account_verification_mailer');

module.exports.profile =  function(request,response){

        // let userName = request.user.name;
        // let userEmail = request.user.email; 

        if(request.xhr){
            return response.json(200,{
                message: "Request Successfull",
                data: {
                    title: 'Profile',
                    userName: request.user.name,
                    userEmail: request.user.email
                }
            });
        }
    



    return response.render('profile',{
        title: 'Profile',
        user_name: request.user.name,
        user_email: request.user.email
        // favourites: favourites
        
    });
}

module.exports.signup = function(request,response){
    return response.render('signup',{
        title: 'SignUp'
    });
}

module.exports.signin = function(request,response){
    return response.render('signin',{
        title: 'SignIn'
    });
}

module.exports.signout = function(request,response){
    request.logout();
    return response.redirect('/');
}

module.exports.create = async function(request,response){

    try{
        if(request.body.password != request.body.confirm_password){
            request.flash('error','Password and Confrim Password does not match');
            return response.redirect('back');
        }
    

        let user = await User.findOne({email: request.body.email})

        if(!user){
            user = await User.create({
                name: request.body.name,
                email: request.body.email,
                emailVerified: false,
                password: request.body.password
            })
            request.flash('success','Please verify your email by clicking the link send to you');
            accountVerificationMailer.sendVerificationLink(user._id,user.name,user.email);
            return response.redirect('/user/signin');

        }

        else{
            request.flash('error','A user with this email already exists');
            return response.redirect('back');
        }

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.createSession = async function(request,response){
     request.flash('success','Logged in successfully');
    return response.redirect('/');
}

module.exports.verifyAccount = async function(request,response){

    try{

        let user = await  User.findById(request.query.user_id)

        if(user.emailVerified == false){
            user.emailVerified = true;
            user.save();
        }

        request.flash('success','Account verified successfully');
        return response.redirect('/user/signin');

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.forgetPassword = async function(request,response){

    return response.render('forgetPassword',{
        title: "Forget Password"
    });
}

module.exports.createAccessToken = async function(request,response){

    try{
        let user = await User.findOne({email: request.body.email})
        .select('name email')

        if(!user){
            request.flash('error','Your are not signed up!');
            // return response.render('signup',{
            //     title: 'SignUp'
            // })
            return response.redirect('back');
        }

        let userAccessToken = await AccessToken.create({
            user: user._id,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true
        })

        passwordRestMailer.sendAccessToken(user,userAccessToken);

        request.flash('success','A reset link is send to your email please click there');
        return response.redirect('back');

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.resetPassword = async function(request,response){

    try{

        let userAccessToken = await AccessToken.findById(request.query.accessToken_id)

        if(userAccessToken.isValid == false){
            request.flash('error','Your accesstoken has expired');
            return response.redirect('/user/signin');
        }

        return response.render('resetPassword',{
            title: "Reset Password",
            user_id: userAccessToken.user
        })

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.changePassword = async function(request,response){

    try{

        if(request.body.password != request.body.confirm_password){
            request.flash('error','Password and confirm password does not match');
            return response.redirect('back');
        }

        let userAccessToken = await AccessToken.findOne({user: request.query.user_id});
        if(userAccessToken.isValid == false){
            request.flash('error','Your accesstoken has expired');
            return response.redirect('/user/signin');
        }
        userAccessToken.isValid = false;
        userAccessToken.save();

        let user = await User.findById(request.query.user_id)

        user.password = request.body.password;
        user.save();

        request.flash('success','Password Changed Successfully');
        return response.redirect('/user/signin');



    }catch(err){
        console.log("Error ",err);
        return;
    }
}
