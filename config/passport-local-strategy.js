const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/User');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(request,email,password,done){

        User.findOne({email: email},function(err,user){
            if(err){
                console.log("Error in finding the user");
                return done(err);
            }

            if(!user || password != user.password){
                // console.log("Invalid username/password");
                request.flash('error','Invalid username/password');
                return done(null,false);
            }

            else if(user.emailVerified == false){
                request.flash('error','Your email is not verified please verify it');
                return done(null,false);
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

    return response.redirect('/user/signin');
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

    return response.redirect('/');

}

module.exports = passport;