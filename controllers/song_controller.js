const Song = require('../model/Songs');

var songPlayingNow = null;
var songPlayingPrev = null;

module.exports.addSong = function(request,response){

    return response.render('add_song',{
        title: 'Add Song'
    })
}

module.exports.create = async function(request,response){

    try{

        let song = await Song.findOne({link: request.body.link});

        if(!song){
            // console.log(request.body);
            
            await Song.create(request.body);

            return response.redirect('/');
        }

        else{
            return response.redirect('back');
        }

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.play = async function(request,response){

    try{

        let song = await Song.findById(request.query.song_id)
        .populate('likedby');

        let play;

        if(songPlayingNow == null){
            play = true;
            if(songPlayingPrev != null){
                let prevSong = await Song.findById(songPlayingPrev);
                prevSong.isPlaying = false;
                prevSong.save();
            }
            song.isPlaying = true;
            song.save();
            songPlayingNow = request.query.song_id;
        }

        else if(songPlayingNow != request.query.song_id){
            play = true;
            songPlayingPrev = songPlayingNow;
            songPlayingNow = request.query.song_id;
            song.isPlaying = true;
            song.save();
            let prevSong = await Song.findById(songPlayingPrev);
            prevSong.isPlaying = false;
            prevSong.save();
        }

        else{
            play = false;
            //songPlayingPrev = null;
            songPlayingPrev = request.query.song_id;
            songPlayingNow = null;
        }
        
        // if(songPlayingNow == null){
        //     //console.log("Play");
        //     play = true;
        //     if(songPlayingPrev != null){
        //         let prevSong = await Song.findById(songPlayingPrev);
        //         prevSong.isPlaying = false;
        //         prevSong.save();
        //     }
        //     songPlayingNow = request.query.song_id;
        //     song.isPlaying = true;
        //     song.save(); 
            
        // }

        // else if(songPlayingNow != request.query.song_id){
        //     //console.log("play");
        //     play = true;
            
        //     songPlayingPrev = songPlayingNow;
        //     songPlayingNow = request.query.song_id;
        //     let prevSong = await Song.findById(songPlayingPrev);
        //     prevSong.isPlaying = false;
        //     prevSong.save();
        //     song.isPlaying = true;
        //     song.save();
        // }

        // else{
        //     //console.log("Pause");
        //     play = false;
        //     songPlayingNow = null;
        //     songPlayingPrev = request.query.song_id;
        // }

    // return response.redirect('back');

        
        var user;
        if(request.user == undefined){
            user = '';
        }
        else{
            user = request.user._id;
        }

        return response.json(200,{
            message: "Request Successfull",
            data: {
                play: play,
                song: song,
                songPlayingPrev: songPlayingPrev,
                user: user
            }
        });

    }catch(err){
        console.log("Error ",err);
        return response.json(500,{
            message: "Internal Server Error"
        });
    }

}