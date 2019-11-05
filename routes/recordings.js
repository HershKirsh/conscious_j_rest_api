const express = require('express');
const router = express.Router();
const recordingModel = require('../models/recording');
//const token = require('../token_code');
const connection = require('../data/db');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './audio');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage })

router.post('/addRecording', upload.single('audioFile'), function (req, res, next) {
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
            ytLink: req.body.ytLink
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

router.get('/recordings', function (req, res) {
  recordingModel.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var personModel = JSON.stringify(data);
    res.send(personModel);
  });
});

module.exports = router;