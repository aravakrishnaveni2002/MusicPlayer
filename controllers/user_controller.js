const User = require('../model/User');
const Song = require('../model/Songs');
const Favourite = require('../model/Favourite');

module.exports.profile = async function(request,response){

    let favourites = await Favourite.find({})
   .populate('user','name')
   .populate('song')
    

    return response.render('profile',{
        title: 'Profile',
        favourites: favourites
        
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
        request.flash('error','Password and Confrim Password does not match');
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
                request.flash('success','User created successfully'); d
                return response.redirect('/user/signin');
            });
        }

        else{
            return response.redirect('back');
        }
    });
}

module.exports.createSession = async function(request,response){
     request.flash('success','Logged in successfully');
    return response.redirect('/');
}