const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MeditationPlaylistSchema = new Schema({
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
        required: true,
    },
    indexLength: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('meditationPlaylist', MeditationPlaylistSchema);