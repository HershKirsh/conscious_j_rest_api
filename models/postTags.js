const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostTagsSchema = new Schema({
    tags: {
        type: Array
    }
})

module.exports = mongoose.model('postTags', PostTagsSchema);