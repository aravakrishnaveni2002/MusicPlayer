const Song = require('../model/Songs');

module.exports.setFlash = function(request,response,next){

    response.locals.flash = {
        'success' : request.flash('success'),
        'error' : request.flash('error')
    }

    next();
} 

module.exports.getSongPlaying = async function(request,response,next){


    let songs = await Song.find({})
    .populate('likedby');

    response.locals.songPlaying = 'null';

    for(let song of songs){
        if(song.isPlaying == true){
            // console.log("*");
            response.locals.songPlaying = song;
        }
    }
    // console.log("_____");

    next();
}