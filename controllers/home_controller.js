const Song = require('../model/Songs');
const User = require('../model/User');
const Favourite = require('../model/Favourite');


module.exports.home = async function(request,response){

    try{
        let songs = await Song.find({})
        .populate({
            path: 'likedby',
            populate: {
                path: 'user',
                select: 'name' 
            }
        })

        

        return response.render('home',{
            title: "Home",
            songs: songs
        });

    }catch(err){
        console.log("Error ",err);
        return;
    }
}