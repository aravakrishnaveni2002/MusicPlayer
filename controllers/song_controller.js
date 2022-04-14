const Song = require('../model/Songs');

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