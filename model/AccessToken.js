const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    accessToken: {
        type: String,
        required: true
    },

    isValid: {
        type: Boolean,
        required: true
    }

},{timestamps: true});

const AccessToken = mongoose.model('AccessToken',accessTokenSchema);
module.exports = AccessToken;