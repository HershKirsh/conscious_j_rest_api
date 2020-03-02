const express = require('express');
const router = express.Router();
const postModel = require('../models/posts');
const connection = require('../data/db');



router.post('/', function (req, res, next) {
  let list = [];
  req.body.list.forEach(post => {
    let newPost = {
      name: post.name,
      instaLink: null,
      tags: []
    };
    list.push(newPost)
  });
  console.log(`there are ${list.length} posts ready`);
  recordingModel.insertMany(list)
    .then(result => {
      addedToDb = true;
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'there was an error when adding user'
      });
    })
});

router.get('/', function (req, res) {
  psotModel.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var docs = JSON.stringify(data);
    res.send(docs);
  });
});

module.exports = router;