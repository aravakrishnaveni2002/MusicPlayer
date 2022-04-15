const Album = require('../../../model/Album');

module.exports.index = async function(request,response){

    try{

        let albums = await Album.find({})
        .populate({
            path: 'songs',
            select: 'name link photo artists',
            populate: {
                path: 'artists',
                select: 'name'
            }
           
        })

        return response.json(200,{
            message: "List of Albums",
            data: {
                albums: albums
            }
            
        })

    }catch(err){
        console.log("**** ",err);
        return response.json(500,{
            message: "Internal Server Error"
        });
    }
}