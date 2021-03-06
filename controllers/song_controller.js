const Song = require('../model/Songs');
const Album = require('../model/Album');
const Artist = require('../model/Artist');
const User = require('../model/User');


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
            
            song = await Song.create({
                link: request.body.link,
                name: request.body.name,
                photo: request.body.photo
            });

            //console.log(song);

            if(request.body.album != ''){
                let album = await Album.findOne({name: request.body.album});
                if(!album){
                    album = await Album.create({
                        photo: request.body.photo,
                        name: request.body.album,
                    });
                }
                album.songs.push(song._id);
                album.save();

                song.album = album._id;
                
            }

            if(request.body.artist != ''){

                let artists = request.body.artist.split(",");

                for(let i=0;i<artists.length;i++){
                    let artist = await Artist.findOne({name: artists[i]});
                    if(!artist){
                        artist = await Artist.create({
                            name: artists[i]
                        });
                    }
                    artist.songs.push(song._id);
                    artist.save();

                    song.artists.push(artist._id);
                    
                }
                
                
            }

            song.save();

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
        .populate('likedby')
        .populate('album artists')
        

        let play;

        if(songPlayingNow == null){
            play = true;
            songPlayingNow = request.query.song_id;
        }

        else if(songPlayingNow != request.query.song_id){
            play = true;
            songPlayingPrev = songPlayingNow;
            songPlayingNow = request.query.song_id;
        }

        else{
            play = false;
            songPlayingPrev = null;
            songPlayingNow = null;
        }

        if(play == true && request.user != undefined){
            let user = await User.findById(request.user._id);

            user.songPlaying = request.query.song_id;
            user.recentlyPlayed.pull(request.query.song_id);
            user.recentlyPlayed.push(request.query.song_id);
            user.save();
            
        }
        
        var user;
        if(request.user == undefined){
            user = '';
        }
        else{
            user = request.user._id;
        }

        // console.log(play);

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

module.exports.allSongsOfAlbum = async function(request,response){

    try{
        let album = await Album.findById(request.query.album_id)
        .populate({
            path: 'songs',
            populate: 'likedby artists'
        })

        var user = '';
        if(request.user != undefined){
            user = request.user._id
        }

        if(request.xhr){
            return response.json(200,{
                message: "Request Successful",
                data: {
                    title: "All Songs",
                    album: album,
                    user: user
                }
            })
        }

        return response.render('allSongsOfAlbum',{
            title: 'All Songs',
            album: album
        });
    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.allSongsOfArtist = async function(request,response){

    try{
        let artist = await Artist.findById(request.query.artist_id)
        .populate({
            path: 'songs',
            populate: 'likedby album'
        })

        var user = '';
        if(request.user != undefined){
            user = request.user._id
        }

        if(request.xhr){
            return response.json(200,{
                message: "Request Successful",
                data: {
                    title: "All Songs",
                    artist: artist,
                    user: user
                }
            })
        }

        return response.render('allSongsOfArtist',{
            title: "All Songs",
            artist: artist
        });

    }catch(err){
        console.log("Error ",err);
        return;
    }


}