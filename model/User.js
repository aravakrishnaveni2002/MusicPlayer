const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true
    },

    emailVerified: {
        type: Boolean,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Favourite'
        } 
    ],

    songPlaying: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'

    },

    recentlyPlayed: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ]

    
        
    

},{timestamps: true});

const User = mongoose.model('User',userSchema);

module.exports = User;