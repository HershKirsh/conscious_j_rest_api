const express = require('express');
const router = express.Router();
const playlistModel = require('../models/playlists');
const connection = require('../data/db');
//const spawn = require('child_process').spawn;
const multer = require('multer');


router.post('/', function (req, res) {
  if (req.body.token !== process.env.token_code) {
    return res.status(401).json({
      message: 'Access Denied'
    });
  } else {
    platlistModel.find({ title: req.body.title })
      .exec()
      .then(platlist => {
        if (platlist.length >= 1) {
          return res.status(409).json({
            message: 'playlist exists, please confirm you are not creating a duplicate.'
          })
        } else {
          let newPlatlist = new platlistModel({
            series: req.body.series,
            title: req.body.title,
            audioLink: req.file.path,
            ytLink: req.body.ytLink,
            number: req.body.number
          });
          newPlatlist
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: 'Playlist added'
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: 'there was an error when adding playlist',
                error: err
              });
            });
        }
      });
  }
});

router.get('/', function (req, res) {
  playlistModel.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var docs = JSON.stringify(data);
    res.send(docs);
  });
});

module.exports = router;