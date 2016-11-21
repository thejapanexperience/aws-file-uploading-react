// AWS Stuff
const Bucket = 'some-unique-bucket-name-99';
const AWS_URL_BASE = 'https://s3.amazonaws.com';
const aws = require('aws-sdk');
const uuid = require('uuid');
const path = require('path');
const s3 = new aws.S3();

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  Key: { type: String, required: true },
});

imageSchema.statics.upload = function (fileObj) {
  return new Promise((resolve, reject) => {
    // 1. Upload data to S3
    // 2. Determine the url of the image on S3
    // 3. Save new image document with the url / original name

    let { buffer, originalname } = fileObj;
    const Key = uuid() + path.extname(originalname);

    const params = {
      Bucket,
      Key,
      ACL: 'public-read',
      Body: buffer,
    };

    s3.putObject(params, (err) => {
      if (err) return reject(err);

      const url = `${AWS_URL_BASE}/${Bucket}/${Key}`;

      // 'this' will invoke the model from inside of it to save the document
      this.create({ url, Key, name: originalname }, (err, imageDoc) => {
        if (err) return reject(err);
        resolve(imageDoc);
      });
    });
  });
};

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
