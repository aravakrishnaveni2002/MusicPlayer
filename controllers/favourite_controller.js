const User = require('../model/User');
const Song = require('../model/Songs');
const Favourite = require('../model/Favourite');


module.exports.favSongs = async function(request,response){

    let favourites = await Favourite.find({})
   .populate('user','name')
   .populate('song')
    

    return response.render('favourite',{
        title: "Favourite Songs",
        favourites: favourites
    });
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