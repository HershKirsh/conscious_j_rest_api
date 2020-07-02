const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VideoPlsSchema = new Schema({
    series: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    playlistId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    number: {
        type: Number,
        required: true
    },
    indexLength: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('video_pls', VideoPlsSchema);