const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/image-upload';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

// put server listen inside mongoose
// to ensure connection doesn't happen until connected to mongoose
mongoose.connect(MONGO_URI, (err) => {
  console.log(err || `Mongo connected to ${MONGO_URI}`);
  server.listen(PORT, (err) => {
    console.log(err || `Express listening on port ${PORT}`);
  });
});
mongoose.Promise = Promise;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

require('./config/webpack')(app);

app.use('/api', require('./routes/api'));
