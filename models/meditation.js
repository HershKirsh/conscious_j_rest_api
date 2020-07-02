const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MeditatioSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    series: {
        type: String,
        required: true,
    },
    ytId: {
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
    },
    thumbnail: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('meditatios', MeditatioSchema);