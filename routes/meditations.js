const express = require('express');
const router = express.Router();
const https = require('https');
const meditationModel = require('../models/meditation');
const connection = require('../data/db');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
});
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


// router.post('/', upload.single('audioFile'), function (req, res) {
//   console.log(req.file)
//   if (req.body.token !== process.env.token_code) {
//     return res.status(401).json({
//       message: 'Access Denied'
//     });
//   } else {
//     meditationModel.find({ title: req.body.title })
//       .exec()
//       .then(meditation => {
//         if (meditation.length >= 1) {
//           return res.status(409).json({
//             message: 'title exists, please confirm you are not creating a duplicate. Change the title if needed.'
//           })
//         } else {
//           console.log(req.file.path);
//           let newMeditation = new meditationModel({
//             series: req.body.series,
//             title: req.body.title,
//             audioLink: req.file.path,
//             ytLink: req.body.ytLink,
//             number: req.body.number
//           });
//           newMeditation
//             .save()
//             .then(result => {
//               console.log(result);
//               res.status(201).json({
//                 message: 'Meditation Added'
//               });
//             })
//             .catch(err => {
//               console.log(err);
//               res.status(500).json({
//                 message: 'there was an error when adding meditation',
//                 error: err
//               });
//             });
//         }
//       });
//   }
// });

router.get('/', function (req, res) {
  meditationModel.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(401);
    }
    var docs = JSON.stringify(data);
    res.send(docs);
  });
});

module.exports = router;