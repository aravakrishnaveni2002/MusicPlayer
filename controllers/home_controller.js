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
        .populate('album artists')
        .sort({'name': 1})

        var user = '';
        if(request.user != undefined){
            user = request.user._id
        }

        if(request.xhr){
            return response.json(200,{
                message: "Request Successfull",
                data: {
                    title: "Home",
                    songs: songs,
                    user: user
                }
            })
        }

        return response.render('home',{
            title: "Home",
            songs: songs
        });

    }catch(err){
        console.log("Error ",err);
        return;
    }
}

