const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true
    },

    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ]
},{timestamps: true});

const Album = mongoose.model('Album',albumSchema);
module.exports = Album;