const User = require('../model/User');
const Song = require('../model/Songs');
const Favourite = require('../model/Favourite');
const Album = require('../model/Album');
const Artist = require('../model/Artist');

module.exports.favSongs = async function(request,response){

    
    try{
    
        let favourites = await Favourite.find({})
        .populate('user','name')
        .populate({
            path: 'song',
            populate: 'album artists'
            
        })    
    
        return response.render('favouriteSongs',{
            title: "Favourite Songs",
            favourites: favourites
        });
    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.favAlbums = async function(request,response){

    try{
        let favourites = await Favourite.find({})
        .populate('user','name')
        .populate({
            path: 'song',
            populate: {
                path: 'album artists',
            }
        })

        return response.render('favouriteAlbums',{
            title: "Favourite Albums",
            favourites: favourites
        });
    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.favArtists = async function(request,response){

    try{
        let favourites = await Favourite.find({})
        .populate('user','name')
        .populate({
            path: 'song',
            populate: {
                path: 'album artists',
            }
        })

        return response.render('favouriteArtists',{
            title: "Favourite Artists",
            favourites: favourites
        })

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.favAlbumSongs = async function(request,response){

    try{
        let album = await Album.findById(request.query.album_id)
        .populate({
            path: 'songs',
            populate: {
                path: 'likedby artists'
            }
        })

        return response.render('favouriteAlbumSongs',{
            title: 'Favourite Album Songs',
            album: album
        })
    }catch(err){
        console.log("Error ",err);
        return;
    }

}

module.exports.favArtistSongs = async function(request,response){

    try{

        let artist = await Artist.findById(request.query.artist_id)
        .populate({
            path: 'songs',
            populate: 'likedby album'
        })

        return response.render('favouriteArtistSongs',{
            title: "Favourite Artist Songs",
            artist: artist
        })

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

module.exports.toogleFav = async function(request,response){

    try{
        let deleted = false;

        let user = await User.findById(request.user._id).populate('favourites');
        let song = await Song.findById(request.query.song_id).populate('likedby');

        let exsistingFav = await Favourite.findOne({
            user: request.user._id,
            song: request.query.song_id

        });

        if(exsistingFav){
            
            user.favourites.pull(exsistingFav._id);
            song.likedby.pull(exsistingFav._id);
            exsistingFav.remove();
            user.save();
            song.save();
            deleted = true;
            
        }

        else{

            let fav = await Favourite.create({
                user: request.user._id,
                song: request.query.song_id
            });

            user.favourites.push(fav._id);
            song.likedby.push(fav._id);
            user.save();
            song.save();
            
            
        }

        //console.log(deleted);

        return response.json(200,{
            message: "Request Successful",
            data:{
                deleted: deleted,
                song_id: song._id,
                location: request.query.loc
            }
        })
            
    }catch(err){
        console.log("Error ",err);
        return response.json(500,{
            message: "Internal Server Error"
        });
    }
}

module.exports.recentlyPlayed = async function(request,response){

    try{

        let user = await User.findById(request.user._id)
        .populate({
            path: 'recentlyPlayed',
            populate: 'album artists likedby'
        })

        return response.render('recentlyPlayedSongs',{
            title: 'Recently Played',
            songs: user.recentlyPlayed 
        })

    }catch(err){
        console.log("Error ",err);
        return;
    }
}