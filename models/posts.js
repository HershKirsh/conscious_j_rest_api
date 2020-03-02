const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    instaLink: {
        type: String,
        required: false,
    },
    tags: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('posts', PostsSchema);