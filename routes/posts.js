const express = require('express');
const router = express.Router();
const postModel = require('../models/posts');
const postTagsModel = require('../models/postTags');
const connection = require('../data/db');


router.post('/', function (req, res, next) {
  let list = [];
  req.body.list.forEach(post => {
    let newPost = new postModel({
      name: post.name,
      instaLink: null,
      tags: []
    });
    list.push(newPost)
  });
  console.log(`there are ${list.length} posts`);
  postModel.insertMany(list)
    .then(result => {
      addedToDb = true;
      console.log(result);
      res.status(200).json({
        message: 'list added'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'there was an error when adding user'
      });
    })
});

router.get('/', function (req, res) {
  postModel.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var docs = JSON.stringify(data);
    res.send(docs);
  });
});

router.patch('/', function (req, res) {
  postModel.updateMany({name: req.body[i].name}, {tags: req.body[i].tags}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var docs = JSON.stringify(data);
    res.send(docs);
  });
});

router.get('/tags', function (req, res) {
  postTagsModel.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var docs = JSON.stringify(data[0].tags);
    res.send(docs);
  });
});

router.patch('/tags', function (req, res) {
  console.log(req.body);
  postTagsModel.findOneAndUpdate({ id: 1 }, { tags: req.body }, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    } else {
      res.status(200).json({
        message: 'tags updated'
      });
    }
  });
});

module.exports = router;