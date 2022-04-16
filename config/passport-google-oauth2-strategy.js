const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../model/User');

passport.use(new googleStrategy({
        clientID: "854471909576-klb8ag8l2n2to9k1ghd5qtf57ih6f2ll.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/user/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){

        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy passport ",err);
                return;
            }

            // console.log(profile);

            if(user){
                return done(null,user);
            }

            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error in creating user google strategy passport ",err);
                        return;
                    }

                    return done(null,user);
                })
            }
        })
    }

))

