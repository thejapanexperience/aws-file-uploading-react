const express = require('express');
const router = express.Router();

const Image = require('../models/Image');

const multer = require('multer');

// dest will save the file to your computer
const uploadzzz = multer({ dest: 'uploads/' });

// change to storage to get the buffer data without saving the file
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('myfile'), (req, res) => {
  console.log('req.file: ', req.file);
  // 1. Upload data to S3
  // 2. Determine the url of the image on S3
  // 3. Save new image document with the url / original name
  Image.upload(req.file)
  .then((imageDoc) => {
    res.send(imageDoc);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;
