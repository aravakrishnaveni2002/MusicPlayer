const User = require('../../../model/User');
const jwt = require('jsonwebtoken');

module.exports.index = async function(request,response){

    try{

        let users = await User.find({})
        .select('name email')
        .populate({
            path: 'favourites',
            select: 'song',
            populate: {
                path: 'song',
                select: 'name photo link',
                populate: {
                    path: 'artists album',
                    select: 'name'
                }
            }

        })
        .populate({
            path: 'recentlyPlayed',
            select: 'name photo link',
            populate: {
                path: 'artists album',
                select: 'name'
            }
            
        })

        return response.json(200,{
            message: "List of Users",
            data: {
                users: users
            }
        })

    }catch(err){
        console.log('**** ',err);
        return response.json(500,{
            message: "Internal Server Error"
        });
    }
}

module.exports.createSession = async function(request,response){

    try{

        let user = await User.findOne({email: request.body.email});

        if(!user || user.password != request.body.password){
            return response.json(422,{
                message: "Invalid username or password"
            });
        }

        return response.json(200,{
            message: "Sign in successfully! here is your token please keep it safe",
            data: {
                token: jwt.sign(user.toJSON(),'MusicPlayer',{expiresIn: '1000000'})
            }
        });

    }catch(err){
        console.log("**** ",err);
        return response.json(500,{
            message: "Internal Server Error"
        });
    }
}