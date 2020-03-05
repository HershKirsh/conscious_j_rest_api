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
        message: 'there was an error when adding posts'
      });
    })
});

router.get('/', function (req, res) {
  var reply = {};
  reply.tags = await getTags();
  reply.posts = await getPosts();
  // postTagsModel.find({}, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(401);
  //   }
  //   reply.tags = data[0].tags;
  // })
  // postModel.find({}, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(401);
  //   }
  //   reply.posts = data;
  // });
  const replyJson = JSON.stringify(reply)
  res.send(replyJson);
});

function getTags() {
  return new Promise(resolve => {
    postTagsModel.find({}, function (err, data) {
      if (err) {
        console.log(err);
        resolve(err);
      }
      resolve(data[0].tags);
    })
  })
}

function getTags() {
  return new Promise(resolve => {
    postModel.find({}, function (err, data) {
      if (err) {
        console.log(err);
        resolve(err);
      }
      resolve(data);
    });
  })
}

router.patch('/', function (req, res) {
  req.body.forEach(post => {
    postModel.findOneAndUpdate({ name: post.name }, { tags: post.tags }, { upsert: true, new: true }, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        res.status(200).json({
          message: "Post tags were updated successfully"
        })
      }
    })
  })
});

// router.get('/tags', function (req, res) {
//   postTagsModel.find({}, function (err, data) {
//     if (err) {
//       console.log(err);
//       return res.status(401);
//     }
//     var docs = JSON.stringify(data[0].tags);
//     res.send(docs);
//   });
// });

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