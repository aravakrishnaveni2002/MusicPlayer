const User = require('../model/User');

module.exports.profile = function(request,response){
    return response.render('profile',{
        title: 'Profile'
    })
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

module.exports.create = function(request,response){

    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }

    User.findOne({email: request.body.email},function(err,user){
        if(err){
            console.log("Error in finding the user");
            return;
        }

        if(!user){
            User.create(request.body,function(err,user){
                if(err){
                    console.log("Error in creating the user");
                    return;
                }

                return response.redirect('/user/signin');
            });
        }

        else{
            return response.redirect('back');
        }
    });
}

module.exports.createSession = function(request,response){

    return response.redirect('/');
}