const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }
},{timestamps: true});

const Favourite = mongoose.model('Favourite',favouriteSchema);
module.exports = Favourite;