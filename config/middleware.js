const Song = require('../model/Songs');
const User = require('../model/User'); 

module.exports.setFlash = function(request,response,next){

    response.locals.flash = {
        'success' : request.flash('success'),
        'error' : request.flash('error')
    }

    next();
} 

module.exports.getSongPlaying = async function(request,response,next){


    response.locals.songPlaying = 'null';

    if(request.user != undefined){
        let user = await User.findById(request.user._id)
        .populate({
            path: 'songPlaying',
            populate: 'likedby album'
        })

        if(user.songPlaying != undefined){
            response.locals.songPlaying = user.songPlaying;

        }
    }

    next();

}