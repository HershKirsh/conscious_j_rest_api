const express = require('express');
const router = express.Router();
const https = require('https');
const recordingModel = require('../models/recording');
const connection = require('../data/db');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});
//const spawn = require('child_process').spawn;
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './audio');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage })


router.post('/', upload.single('audioFile'), function (req, res, next) {
  console.log(req.file)
  if (req.body.token !== process.env.token_code) {
    return res.status(401).json({
      message: 'Access Denied'
    });
  } else {
    recordingModel.find({ title: req.body.title })
      .exec()
      .then(recording => {
        if (recording.length >= 1) {
          return res.status(409).json({
            message: 'title exists, please confirm you are not creating a duplicate. Change the title if needed.'
          })
        } else {
          console.log(req.file.path);
          let newRecording = new recordingModel({
            series: req.body.series,
            title: req.body.title,
            audioLink: req.file.path,
            ytLink: req.body.ytLink,
            number: req.body.number
          });
          newRecording
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: 'Recording Added'
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                message: 'there was an error when adding user',
                error: err
              });
            });
        }
      });
  }
});

router.get('/', function (req, res) {
  recordingModel.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var docs = JSON.stringify(data);
    res.send(docs);
  });
});

module.exports = router;