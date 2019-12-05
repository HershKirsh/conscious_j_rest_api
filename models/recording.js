const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecordingSchema = new Schema({
    series: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    audioLink: {
        type: String,
        required: true
    },
    ytLink: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('recordings', RecordingSchema);