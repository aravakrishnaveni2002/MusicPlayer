const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../model/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email,password,done){

        User.findOne({email: email},function(err,user){
            if(err){
                console.log("Error in finding the user");
                return;
            }

            if(!user || password != user.password){
                console.log("Invalid username/password");
                return(null,false);
            }

            return done(null,user);
        }); 
    }
));

//serealizing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    return done(null,user);
}); 

//desearlizing the user from the key in the cookie
passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user");
            return done(err);
        }

        return done(null,user);
    });
});


passport.checkAuthentication = function(request,response,next){

    if(request.isAuthenticated()){
        return next();
    }

    return response.request('/user/signin');
}

passport.setAuthenticatedUser = function(request,response,next){
    if(request.isAuthenticated()){
        response.locals.user = request.user;
    }

    return next();
}

passport.checkUserNotSignedIn = function(request,response,next){

    if(!request.isAuthenticated()){
        return next();
    }

    return response.render('/user/profile');

}

module.exports = passport;