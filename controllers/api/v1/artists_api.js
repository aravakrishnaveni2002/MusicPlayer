const Artist = require('../../../model/Artist');

module.exports.index = async function(request,response){

    try{

        let artists = await Artist.find({})
        .populate({
            path: 'songs',
            select: 'name link photo',
            populate: {
                path: 'album',
                select: 'name'
            }
        })

        return response.json(200,{
            message: "List of Artists",
            data: {
                artists: artists
            }
        })

    }catch(err){
        console.log("**** ",err);
        return response.json(500,{
            message: "Internal Server Error"
        });
    }
}