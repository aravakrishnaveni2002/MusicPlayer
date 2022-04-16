const Song = require('../../../model/Songs');

module.exports.index = async function(request,response){
    
    try{

        let songs = await Song.find({})
        .populate({
            path: 'likedby',
            populate: {
                path: 'user',
                select: 'name'
            }
        })
        .populate({
            path: 'album',
            select: 'name'
        })
        .populate({
            path: 'artists',
            select: 'name'
        })
        .sort({'name': 1})

        return response.json(200,{
            message: "List of Songs",
            data: {
                songs: songs
            }
            
        })

    }catch(err){
        console.log("**** ",err);
        return response.json(500,{
            message: "Internal Server Error"
        });
    }
}