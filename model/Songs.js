const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({

    link:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    photo:{
        type: String,
        required: true
    },

    artist:{
        type: String
    },

    album:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },

    likedby: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Favourite'
        }
    ]


},{timestamps: true});

const Song = mongoose.model('Song',songsSchema);

module.exports = Song;